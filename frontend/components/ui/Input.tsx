'use client';

import { InputHTMLAttributes, forwardRef, useEffect, useState } from 'react';
import { m } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, success = false, ...props }, ref) => {
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
          className="relative"
        >
          <input
            type={type}
            className={cn(
              'w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all bg-white',
              error
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-brand-champagne focus:ring-brand-gold focus:border-brand-gold focus:scale-[1.01]',
              'disabled:bg-brand-champagne/20 disabled:cursor-not-allowed',
              success && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {success && (
            <m.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <CheckCircle className="h-5 w-5 text-green-600" />
            </m.div>
          )}
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

Input.displayName = 'Input';

export default Input;
