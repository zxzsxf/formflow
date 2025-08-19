import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  indeterminate?: boolean;
  size?: 'small' | 'large' | 'middle';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (checked: boolean) => void;
}

const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (e: any) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(e.target.checked);
    // }
    if(typeof onChange === 'function') {
      onChange(e.target.checked);
    }
  };

  return (
    <AntCheckbox
      {...props}
      checked={field?.value || false}
      onChange={handleChange}
    />
  );
};

export const Checkbox = connect(
  CheckboxComponent,
  mapProps((props: CheckboxProps) => {
    const { checked, ...rest } = props;
    return {
      ...rest,
      checked: checked ?? false,
    };
  }),
  mapReadPretty(PreviewText.Checkbox)
);

export default Checkbox; 