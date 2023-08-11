import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type OptionType = {
  label?: string;
  value: string | number;
} | null;

type SegmentedProps = {
  options: OptionType[]; // 选项
  defaultValue?: string | number; // 默认值
  onChange?: (value: string | number) => void;
  className?: string;
  id?: string;
};

export const Segmented = ({ options, defaultValue, onChange, className, id }: SegmentedProps) => {
  const [value, setValue] = useState(() => defaultValue || options[0]?.value || '');
  const select = useCallback(
    (value: string | number) => {
      setValue(value);
      onChange?.(value);
    },
    [setValue, onChange],
  );
  const isSelected = useCallback((selectedValue: string | number) => value === selectedValue, [value]);
  return (
    <div className={twMerge('flex w-fit cursor-pointer items-center rounded-md p-1 text-xs font-semibold', className)}>
      {options.map((option) => {
        if (!option) return null;
        const { label, value } = option;
        return (
          <div
            className={clsx('relative px-3 py-1 first:rounded-l-lg last:rounded-r-lg', {
              'text-blue': isSelected(value),
            })}
            onClick={() => select(value)}
            key={value}
          >
            {label ?? value}
            {isSelected(value) && (
              <motion.div layoutId={`segmented_selected_${id ?? 'default'}`} className="absolute inset-0 rounded bg-blue/10" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Segmented);
