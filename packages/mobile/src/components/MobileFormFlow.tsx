import React from 'react';
import { MobileForm } from './MobileForm';
import { MobileFormField } from './MobileFormField';

export interface MobileFormFlowProps {
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

const MobileFormFlow: React.FC<MobileFormFlowProps> = ({
  fields,
  onSubmit,
  className = ''
}) => {
  return (
    <MobileForm onSubmit={onSubmit} className={className}>
      {fields.map(field => (
        <MobileFormField
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
    </MobileForm>
  );
};

export default MobileFormFlow; 