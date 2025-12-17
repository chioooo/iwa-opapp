import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  loading = false,
  variant = 'primary',
  disabled,
  className = '',
  ...props
}) => {
  const baseClasses = 'w-full px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98]';
  
  const variantClasses = {
    primary: 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white shadow-md',
    secondary: 'bg-white hover:bg-gray-50 text-[var(--color-primary)] border-2 border-[var(--color-primary)]'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${
        (disabled || loading) ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
      } ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children}
    </button>
  );
};
