import clsx from 'clsx';
import { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  borderGradient?: boolean;
  loading?: boolean;
  showIndicate?: boolean;
  type?: 'normal' | 'primary';
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
};
const Button = forwardRef<HTMLButtonElement, PropsWithChildren<ButtonProps>>(
  ({ children, onClick, className, type = 'normal', htmlType }, ref) => {
    return (
      <button
        type={htmlType}
        onClick={onClick}
        className={twMerge(
          clsx(
            'flex cursor-pointer items-center justify-center gap-1 rounded-xl border border-black/10 bg-white px-4 py-3 text-xs text-black backdrop-blur hover:opacity-90',
          ),
          className,
        )}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
Button.displayName = 'Button';
export default Button;
