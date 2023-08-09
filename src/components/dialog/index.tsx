import React, { cloneElement, useCallback, useEffect, useState } from 'react';
import {
  useClick,
  useFloating,
  useInteractions,
  useRole,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
  FloatingNode,
  useFloatingNodeId,
  useDismiss,
} from '@floating-ui/react';
import { motion, AnimatePresence, MotionProps } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RiCloseFill } from 'react-icons/ri';

const zIndexClass = {
  0: 'z-0',
  20: 'z-20',
  30: 'z-30',
  40: 'z-40',
  50: 'z-50',
};
type DialogProps = {
  open?: boolean;
  title?: React.ReactNode;
  background?: string;
  zIndex?: 0 | 20 | 30 | 40 | 50;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onExitComplete?: () => void;
  showCloseButton?: boolean;
  render: (props: { close: () => void }) => React.ReactNode;
  children?: JSX.Element;
  className?: string;
  scroll?: boolean;
  renderHeader?: (props: { close: () => void }) => React.ReactNode;
  renderFooter?: (props: { close: () => void }) => React.ReactNode;
  maskClass?: string;
};

function Dialog({
  render,
  open: passedOpen = false,
  title,
  children,
  showCloseButton = true,
  onOpenChange,
  onExitComplete,
  onClose: prevOnClose,
  className,
  renderHeader,
  renderFooter,
  zIndex = 20,
  scroll = true,
  background = 'bg-diary-dialog',
  maskClass,
}: React.PropsWithChildren<DialogProps>) {
  const [open, setOpen] = useState(false);

  const nodeId = useFloatingNodeId();

  const onClose = useCallback(
    (value: boolean) => {
      setOpen(value);
      prevOnClose?.();
      onOpenChange?.(value);
    },
    [onOpenChange, prevOnClose],
  );

  const {
    refs: { setFloating, setReference },
    context,
  } = useFloating({
    open,
    nodeId,
    onOpenChange: onClose,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), useDismiss(context)]);

  const _renderHeader = useCallback(() => {
    if (renderHeader) return renderHeader?.({ close: () => onClose(false) });
    if (!title && !showCloseButton) return null;
    return (
      <div className="relative mb-4 h-auto text-center text-xl font-medium leading-[22px]">
        {title}
        {showCloseButton && (
          <div className="absolute right-0 top-0 flex h-4 w-4 cursor-pointer items-center justify-center">
            <RiCloseFill
              className="stroke-white transition-all duration-300 hover:rotate-180"
              width={14}
              height={14}
              onClick={() => onClose(false)}
            />
          </div>
        )}
      </div>
    );
  }, [onClose, renderHeader, showCloseButton, title]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setOpen(passedOpen);
  }, [passedOpen]);

  return (
    <FloatingNode id={nodeId}>
      {children && cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <FloatingPortal>
        <AnimatePresence onExitComplete={onExitComplete}>
          {open && (
            <FloatingOverlay
              lockScroll
              className={twMerge(
                clsx('grid place-items-center bg-diary-dialog-mask backdrop-blur transition', zIndexClass[zIndex]),
                maskClass,
              )}
            >
              <FloatingFocusManager context={context}>
                <motion.div
                  className={twMerge(
                    clsx(
                      `relative flex h-fit max-h-[85vh] max-w-5xl flex-col rounded-[10px] ${background} min-w-[30rem] text-white md:min-w-[11.25rem]`,
                      renderFooter ? 'p-5 pb-20' : ' p-5',
                    ),
                    className,
                  )}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  {...getFloatingProps({ ref: setFloating })}
                >
                  {_renderHeader()}
                  <main
                    className={clsx('flex-grow', {
                      'overflow-auto': scroll,
                    })}
                  >
                    {render({ close: () => onClose(false) })}
                  </main>
                  {renderFooter && (
                    <footer className="absolute bottom-0 left-0 right-0 rounded-b-[10px] px-6 py-6 backdrop-blur-xl">
                      {renderFooter?.({ close: () => onClose(false) })}
                    </footer>
                  )}
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </FloatingNode>
  );
}

export default React.memo(Dialog);
