import clsx from 'clsx';
import { motion } from 'framer-motion';
import React, { useCallback, useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

export type OptionType = {
  label?: string;
  value: string | number;
  disabled?: boolean;
} | null;

type SegmentedProps = {
  options: OptionType[];
  defaultValue?: string | number;
  value?: string | number; // Optional controlled value
  onChange?: (value: string | number) => void;
  id?: string;
  className?: string;
  optionClass?: string;
};

export const Segmented = ({
  options,
  defaultValue,
  value: controlledValue,
  onChange,
  id,
  className,
  optionClass,
}: SegmentedProps) => {
  const [internalValue, setInternalValue] = useState(() => defaultValue || options[0]?.value || '');

  // Effect to update internal state when defaultValue changes
  useEffect(() => {
    if (defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue]);

  const select = useCallback(
    (newValue: string | number) => {
      if (controlledValue === undefined) {
        // It's uncontrolled
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange],
  );

  const isSelected = useCallback(
    (selectedValue: string | number) => {
      // Use the controlledValue if it's provided, otherwise use the internal state
      const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
      return currentValue === selectedValue;
    },
    [controlledValue, internalValue],
  );

  return (
    <div className={twMerge('flex w-fit cursor-pointer items-center rounded-md p-1 text-xs font-semibold', className)}>
      {options.map((option) => {
        if (!option) return null;
        const { label, value: optionValue, disabled } = option;
        return (
          <div
            className={clsx(
              'relative px-3 py-1 first:rounded-l-lg last:rounded-r-lg',
              {
                'text-blue': isSelected(optionValue),
              },
              { 'text-gray-400': disabled },
              optionClass,
            )}
            onClick={() => !disabled && select(optionValue)}
            key={optionValue}
          >
            {label ?? optionValue}
            {isSelected(optionValue) && (
              <motion.div layoutId={`segmented_selected_${id ?? 'default'}`} className="absolute inset-0 rounded bg-blue/10" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Segmented);
