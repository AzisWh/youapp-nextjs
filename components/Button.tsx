'use client';
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles =
    'w-full h-[51px] rounded-lg text-[14px] font-semibold flex justify-center items-center transition-all backdrop-blur-[20px]';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#62CDCB] to-[#4599DB] text-white hover:opacity-90',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 backdrop-blur-[20px]',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className} ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={isLoading || props.disabled}
      onClick={onClick}
      {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
