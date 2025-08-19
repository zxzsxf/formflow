import React from 'react';

export interface MobileFormFieldProps {
  name: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio';
  label: string;
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  className?: string;
}

export const MobileFormField: React.FC<MobileFormFieldProps> = ({
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  options = [],
  className = ''
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className={`mobile-form-field ${className}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        value={value || ''}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}; 