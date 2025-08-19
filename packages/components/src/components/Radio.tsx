import React from 'react';
import { Radio as AntRadio } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface RadioProps {
  value?: any;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'large' | 'middle';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: any) => void;
}

const RadioComponent: React.FC<RadioProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (e: any) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(e.target.value);
    // }
    if(typeof onChange === 'function') {
      onChange(e.target.value);
    }
  };

  return (
    <AntRadio
      {...props}
      value={field?.value || ''}
      onChange={handleChange}
    />
  );
};

export const Radio = connect(
  RadioComponent,
  mapProps((props: RadioProps) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? '',
    };
  }),
  mapReadPretty(PreviewText.Radio)
);

export default Radio; 