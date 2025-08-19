import React from 'react';
import { InputNumber as AntInputNumber } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface InputNumberProps {
  value?: number;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  size?: 'large' | 'middle' | 'small';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: number | string | null) => void;
}

const InputNumberComponent: React.FC<InputNumberProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (value: number | string | null) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(value);
    // }
    if(typeof onChange === 'function') {
      onChange(value);
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

  return (
    <AntInputNumber
      {...props}
      value={field?.value || undefined}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export const InputNumber = connect(
  InputNumberComponent,
  mapProps((props: InputNumberProps) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? undefined,
    };
  }),
  mapReadPretty(PreviewText.Number)
);

export default InputNumber; 