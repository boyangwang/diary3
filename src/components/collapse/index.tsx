import React, { ReactNode, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CollapseProps {
  title?: string;
  renderTitle?: ({ isOpen }: { isOpen: boolean }) => ReactNode;
  children?: ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ title, renderTitle, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const _renderTitle = useCallback(() => {
    if (renderTitle) return renderTitle({ isOpen });
    return title;
  }, [isOpen, renderTitle, title]);

  return (
    <motion.div layout initial={{ borderRadius: 10 }}>
      <motion.header onClick={toggleOpen} initial={{ borderRadius: 10 }}>
        {_renderTitle()}
      </motion.header>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            layout
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8 }}
          >
            {children}
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Collapse;
