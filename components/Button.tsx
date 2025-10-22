import { JSX } from 'preact';
import { IS_BROWSER } from '$fresh/runtime.ts';

interface ButtonProps extends Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  variant = 'primary',
  size = 'md',
  class: className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    primary: 'bg-yellow-500 hover:bg-yellow-600 text-black hover:shadow-lg hover:scale-105',
    secondary: 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg hover:scale-105',
    outline: 'border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    />
  );
}
