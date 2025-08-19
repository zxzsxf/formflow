import React, { ReactNode } from 'react';
import { Form as AntForm } from 'antd';
import { connect } from '@formily/react';

export interface FormProps {
  children: ReactNode;
  onSubmit?: (data: any) => void;
  className?: string;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: any;
  wrapperCol?: any;
}

const FormComponent: React.FC<FormProps> = ({ 
  children, 
  onSubmit, 
  className = '',
  layout = 'horizontal',
  labelCol = { span: 6 },
  wrapperCol = { span: 18 }
}) => {
  const handleFinish = (values: any) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  return (
    <AntForm
      onFinish={handleFinish}
      className={className}
      layout={layout}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      {children}
    </AntForm>
  );
};

export const Form = connect(FormComponent);

export default Form; 