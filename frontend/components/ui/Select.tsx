'use client';

import { SelectHTMLAttributes, forwardRef, ReactNode, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: { value: string; label: string }[];
  children?: ReactNode;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, children, ...props }, ref) => {
    const [showError, setShowError] = useState(false);

    useEffect(() => {
      if (error) {
        setShowError(true);
        const timer = setTimeout(() => setShowError(false), 500);
        return () => clearTimeout(timer);
      }
    }, [error]);

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-charcoal mb-1">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <m.div
          animate={showError ? { x: [-3, 3, -3, 3, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <select
            className={cn(
              'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all appearance-none bg-white',
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-brand-champagne focus:ring-brand-gold focus:border-brand-gold focus:scale-[1.01]',
              'disabled:bg-brand-champagne/20 disabled:cursor-not-allowed',
              className
            )}
            ref={ref}
            {...props}
          >
            {options
              ? options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))
              : children}
          </select>
        </m.div>
        {error && (
          <m.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-1 text-sm text-red-600"
          >
            {error}
          </m.p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
