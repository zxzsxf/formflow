import React from 'react';
import { PCForm } from './PCForm';
import { PCFormField } from './PCFormField';

export interface PCFormFlowProps {
  fields: Array<{
    name: string;
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio';
    label: string;
    required?: boolean;
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
  onSubmit?: (data: any) => void;
  className?: string;
}

const PCFormFlow: React.FC<PCFormFlowProps> = ({
  fields,
  onSubmit,
  className = ''
}) => {
  return (
    <PCForm onSubmit={onSubmit} className={className}>
      {fields.map(field => (
        <PCFormField
          key={field.name}
          name={field.name}
          type={field.type}
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          options={field.options}
        />
      ))}
      <button type="submit">提交</button>
    </PCForm>
  );
};

export default PCFormFlow; 