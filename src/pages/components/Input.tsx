import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-gray-700 mb-2">
          {label}
        </label>
        <input
          ref={ref}
          className={`w-full px-4 py-3 bg-white border rounded-lg transition-colors outline-none ${
            error
              ? 'border-[var(--color-error)] focus:border-[var(--color-error)]'
              : 'border-gray-300 focus:border-[var(--color-primary)]'
          }`}
          {...props}
        />
        {error && (
          <p className="mt-2 text-[var(--color-error)] text-sm">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
