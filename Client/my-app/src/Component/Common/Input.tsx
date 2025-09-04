import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ label, error, icon, id, ...props }) => {
  const inputId =
    id || `input-${(label || "field").replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col mb-4">
      {label && (
        <label htmlFor={inputId} className="mb-1 font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="flex items-center border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-green-400">
        {icon && <span className="mr-2">{icon}</span>}
        <input
          id={inputId}
          className="flex-1 outline-none"
          {...props}
        />
      </div>
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
};

export default Input;
