'use client';

import eyeDisable from '@/assets/images/eye-disable.png';
import eye from '@/assets/images/eye.png';
import Image from 'next/image';
import { useId } from 'react';
import { useController } from 'react-hook-form';

function Input({
  label,
  onChange,
  type,
  placeholder,
  required,
  errorText,
  isPassword = false,
  isShowPassword = false,
  onClick,
  name,
  control,
}) {
  const inputId = useId();
  const { field, fieldState, formState } = useController({ name, control });
  return (
    <div className="inline-flex flex-col w-full mb-6">
      <label htmlFor={inputId} className="text-lg font-bold mb-4">
        {label}
        {required && <sup className="text-red-500">*</sup>}
      </label>
      <div className="relative">
        <input
          id={inputId}
          // name={field.name}
          type={!isPassword || !isShowPassword ? type : 'text'}
          // value={field.value}
          defaultValue={fieldState.defaultValue}
          onChange={onChange}
          // onBlur={field.onBlur}
          placeholder={placeholder}
          className={`outline-[#3692ff] w-full px-6 py-2 h-14  bg-[#f3f4f6] placeholder-gray-400  text-black rounded-lg focus:ring-2 ring-white ring-offset-2 fing-offset-gray-500 transition-all ${
            errorText ? 'outline-[#F74747]' : ''
          }`}
        />
        {isPassword && (
          <Image
            src={isShowPassword ? eye : eyeDisable}
            alt="toggle-show-password"
            className="w-6 absolute bottom-4 right-6 cursor-pointer"
            onClick={onClick}
          />
        )}
      </div>
      {errorText && (
        <span className="ml-4 mt-2 text-[15px] font-semibold text-[#F74747]">
          {errorText}
        </span>
      )}
    </div>
  );
}

export default Input;
