import React from 'react';
import { Select as AntSelect } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

const { Option } = AntSelect;

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  mode?: 'multiple' | 'tags';
  options?: SelectOption[];
  size?: 'large' | 'middle' | 'small';
  allowClear?: boolean;
  showSearch?: boolean;
  filterOption?: boolean | ((input: string, option: any) => boolean);
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string | string[]) => void;
}

const SelectComponent: React.FC<SelectProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (value: string | string[]) => {
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
    <AntSelect
      {...props}
      value={field?.value || undefined}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    >
      {props.options?.map(option => (
        <Option key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </Option>
      ))}
    </AntSelect>
  );
};

export const Select = connect(
  SelectComponent,
  mapProps((props: SelectProps) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? undefined,
    };
  }),
  mapReadPretty(PreviewText.Select)
);

export default Select; 