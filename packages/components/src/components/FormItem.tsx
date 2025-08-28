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

// 使用 React.forwardRef 来解决 ref 问题
const FormItemComponent = React.forwardRef<HTMLDivElement, FormItemProps>((props, ref) => {
  const { name, children, ...restProps } = props;
  console.log('formItem oldformitem', props);
  
  // 如果提供了 name，则使用 Field 组件创建字段上下文
  if (name) {
    return (
      <div ref={ref}>
        <Field
          name={name}
          decorator={[Item, restProps]}
          component={[() => children, {}]}
        />
      </div>
    );
  }
  
  // 包装在 div 中以支持 ref
  return (
    <div ref={ref}>
      <Item {...restProps}>{children}</Item>
    </div>
  );
});

// 设置 displayName 以便调试
FormItemComponent.displayName = 'FormItemComponent';

// 使用 connect 连接 Formily 的字段系统
export const FormItem = connect(FormItemComponent);

export default FormItem; 