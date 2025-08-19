import React from 'react';
import { Input } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

const { TextArea: AntTextArea } = Input;

export interface TextAreaProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  showCount?: boolean;
  maxLength?: number;
  autoSize?: boolean | { minRows: number; maxRows: number };
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const TextAreaComponent: React.FC<TextAreaProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  return (
    <AntTextArea
      {...props}
      value={field?.value || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export const TextArea = connect(
  TextAreaComponent,
  mapProps((props: TextAreaProps) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? '',
    };
  }),
  mapReadPretty(PreviewText.TextArea)
);

export default TextArea; 