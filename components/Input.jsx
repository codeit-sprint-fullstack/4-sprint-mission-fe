"use client";

import { useId } from "react";

function Input({
  label,
  name,
  value,
  onChange,
  type,
  placeholder,
  required,
  helperText,
}) {
  const inputId = useId();
  return (
    <div className="flex flex-col gap-3 mb-4">
      <label className="text-lg font-bold" htmlFor={inputId}>
        {label}
      </label>
      {/* input값에 따라 textarea 또는 input 반환 */}
      {type === "textarea" ? (
        <textarea
          className="bg-gray-200 px-4 py-3 rounded-xl h-52"
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="bg-gray-200 px-4 py-3 rounded-xl"
        />
      )}
      {helperText && (
        <span className="text-sm text-white/70">{helperText}</span>
      )}
    </div>
  );
}

export default Input;
