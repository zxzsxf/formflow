import React from 'react';

export interface FormFieldProps {
  name: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio';
  label: string;
  value?: string | number | boolean | string[];
  onChange?: (value: string | number | boolean | string[]) => void;
  placeholder?: string;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'select':
        return (
          <select
            name={name}
            value={value as string || ''}
            onChange={handleChange}
            className={className}
            required={required}
          >
            <option value="">{placeholder || '请选择'}</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            name={name}
            checked={value as boolean || false}
            onChange={handleCheckboxChange}
            className={className}
            required={required}
          />
        );
      
      case 'radio':
        return (
          <div>
            {options.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className={className}
                  required={required}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      
      default:
        return (
          <input
            type={type}
            name={name}
            value={value as string || ''}
            onChange={handleChange}
            placeholder={placeholder}
            className={className}
            required={required}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {renderInput()}
    </div>
  );
}; 