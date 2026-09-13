import { LoaderCircle } from 'lucide-react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success';
  loading?: boolean;
  children: ReactNode;
  block?: boolean;
}

export function Button({
  variant = 'primary',
  loading = false,
  children,
  block,
  className = '',
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${block ? 'btn--block' : ''} ${className}`.trim()}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <LoaderCircle size={18} className="spin" /> : null}
      {children}
    </button>
  );
}
