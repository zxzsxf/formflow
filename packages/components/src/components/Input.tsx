import React from 'react';
import { Input as AntInput } from 'antd';
import { useField, observer } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface InputProps {
  name?: string; // 添加 name 属性
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  showCount?: boolean;
  size?: 'large' | 'middle' | 'small';
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const InputComponent: React.FC<InputProps> = observer((props) => {
  const { name, onChange, ...restProps } = props;
  const field = useField<any>();
  
  // 如果没有字段实例，输出警告
  if (!field) {
    console.warn('Input component: field is undefined. Make sure the Input is wrapped with FormItem and has a name prop.');
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(e.target.value);
    // }
    if(typeof onChange === 'function') {
      onChange(e.target.value);
    }
  };

  const handleBlur = () => {
    if (field && typeof field.onBlur === 'function') {
      field.onBlur();
    }
  };

  const handleFocus = () => {
    if (field && typeof field.onFocus === 'function') {
      field.onFocus();
    }
  };

  // 使用 field.value 作为受控值，确保响应式更新
  const fieldValue = field?.value;

  return (
    <AntInput
      {...restProps}
      value={fieldValue || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
});

export const Input = connect(
  InputComponent,
  mapProps((props: InputProps) => {
    // 不要覆盖 value，让组件使用 field.value
    const { value, ...rest } = props;
    return {
      ...rest,
      // 移除 value 的覆盖，让组件内部使用 field.value
    };
  }),
  mapReadPretty(PreviewText.Input)
);

export default Input; 