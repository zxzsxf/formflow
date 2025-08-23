// @ts-nocheck
import React from 'react';
import { Form } from './Form';
import { FormField } from './FormField';

export interface FlowFormProps {
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

const FlowForm: React.FC<FlowFormProps> = ({
  fields,
  onSubmit,
  className = ''
}) => {
  const handleAutoSubmit = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <Form onAutoSubmit={handleAutoSubmit} className={className}>
      {fields.map(field => (
        <FormField
          key={field.name}
          name={field.name}
          type={field.type}
          label={field.label}
          required={field.required}
          placeholder={field.placeholder}
          options={field.options}
        />
      ))}
    </Form>
  );
};

export default FlowForm; 