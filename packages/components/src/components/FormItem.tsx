import React from 'react';
import { Form } from 'antd';
import { connect, useField, Field } from '@formily/react';

const { Item } = Form;

export interface FormItemProps {
  label?: React.ReactNode;
  name?: string;
  required?: boolean;
  help?: React.ReactNode;
  extra?: React.ReactNode;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  hasFeedback?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const FormItemComponent: React.FC<FormItemProps> = (props) => {
  const { name, children, ...restProps } = props;
  
  // 如果提供了 name，则使用 Field 组件创建字段上下文
  if (name) {
    return (
      <Field
        name={name}
        decorator={[Item, restProps]}
        component={[() => children, {}]}
      />
    );
  }
  
  return <Item {...restProps}>{children}</Item>;
};

export const FormItem = connect(FormItemComponent);

export default FormItem; 