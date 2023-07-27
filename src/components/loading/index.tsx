import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { AiOutlineLoading } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';

export type LoadingProps = {
  /** 显示与否 */
  show?: boolean;
  /** 自定义Loading图标 */
  renderIcon?: () => ReactNode;
  /** 旋转容器额外的 CSS className */
  className?: string;
  /** 旋转容器额外的 CSS style */
  style?: React.CSSProperties;
  /** 图标额外的 CSS className */
  iconClassName?: string;
  /** 图标容器额外的 CSS style */
  iconStyle?: React.CSSProperties;
};

const Loading = ({ show, renderIcon, className, style, iconClassName, iconStyle }: LoadingProps) => {
  const _renderIcon = (): ReactNode => {
    if (renderIcon) return renderIcon();
    return <AiOutlineLoading className={twMerge('h-5 w-5 animate-spin', iconClassName)} style={iconStyle} />;
  };

  return show ? (
    <div className={clsx('inline-block animate-spin text-base', className)} style={style}>
      {_renderIcon()}
    </div>
  ) : null;
};
Loading.defaultProps = {
  show: true,
};
export default Loading;
