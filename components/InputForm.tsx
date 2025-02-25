'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import eyes from '../public/images/icons/eyes.svg';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showToggleIcon?: boolean;
}

const InputForm: React.FC<InputProps> = ({
  type = 'text',
  showToggleIcon = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => setShowPassword((prev) => !prev);

  const isPasswordType = type === 'password';
  return (
    <div className="relative w-full">
      <input
        type={isPasswordType && showPassword ? 'text' : type}
        className="bg-[#1F4247]/50 text-white text-[13px] rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full h-[51px] p-2.5 pr-10"
        {...props}
      />

      {isPasswordType && showToggleIcon && (
        <button
          type="button"
          onClick={handleToggle}
          className="absolute inset-y-0 right-2 flex items-center">
          <Image
            src={eyes}
            alt={showPassword ? 'Hide password' : 'Show password'}
            width={20}
            height={20}
            className={showPassword ? 'brightness-100' : 'brightness-50'}
          />
        </button>
      )}
    </div>
  );
};

export default InputForm;
