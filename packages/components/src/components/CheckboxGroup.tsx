import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  value?: string[];
  options?: CheckboxOption[];
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'large' | 'middle';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (checkedValues: string[]) => void;
}

const CheckboxGroupComponent: React.FC<CheckboxGroupProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (checkedValues: string[]) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(checkedValues);
    // }
    if(typeof onChange === 'function') {
      onChange(checkedValues);
    }
  };

  return (
    <AntCheckbox.Group
      {...props}
      value={field?.value || []}
      // @ts-ignore
      onChange={handleChange}
    />
  );
};

export const CheckboxGroup = connect(
  CheckboxGroupComponent,
  mapProps((props: CheckboxGroupProps) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? [],
    };
  }),
  mapReadPretty(PreviewText.CheckboxGroup)
);

export default CheckboxGroup; 