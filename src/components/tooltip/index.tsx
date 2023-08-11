import {
  FloatingPortal,
  Placement,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import clsx from 'clsx';
import React, { cloneElement, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
type TooltipProps = {
  offsetX?: number;
  title: React.ReactNode;
  placement?: Placement;
  className?: string;
  children: JSX.Element;

  bgClass?: string;
  arrowClass?: string;
};

export default function Tooltip({ children, title, placement = 'top', offsetX, className, bgClass, arrowClass }: TooltipProps) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { x, y, refs, strategy, context, middlewareData } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(offsetX ?? 5), shift(), arrow({ element: arrowRef }), flip({ fallbackAxisSideDirection: 'start' })],
  });
  const { arrow: arrowData } = middlewareData;

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { move: false }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: 'tooltip' }),
  ]);

  const side = placement.split('-')[0];
  const staticSide = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }[side];
  const rotate = { top: 'rotate(0deg)', right: 'rotate(90deg)', bottom: 'rotate(180deg)', left: 'rotate(-90deg)' }[side];

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs.setReference, ...children.props }))}
      <FloatingPortal id="floating-tooltip">
        {open && (
          <div
            className={twMerge('bg-black px-2 py-1 font-DDin text-xs text-white', clsx(bgClass, className))}
            ref={refs.setFloating}
            style={{
              position: strategy,
              zIndex: 100,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {title}
            <div
              className={twMerge('clip-path-down-triangle h-1.5 w-3 bg-black', clsx(bgClass, arrowClass))}
              ref={arrowRef}
              style={{
                position: strategy,
                left: arrowData?.x,
                top: arrowData?.y,
                [staticSide!]: -(arrowRef.current?.offsetWidth ?? 0) + 7,
                transform: rotate,
              }}
            />
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
