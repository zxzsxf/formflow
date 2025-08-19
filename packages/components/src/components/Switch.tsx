import React from 'react';
import { Switch as AntSwitch } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface SwitchProps {
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'default';
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (checked: boolean) => void;
}

const SwitchComponent: React.FC<SwitchProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (checked: boolean) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(checked);
    // }
    if(typeof onChange === 'function') {
      onChange(checked);
    }
  };

  return (
    <AntSwitch
      {...props}
      checked={field?.value || false}
      onChange={handleChange}
    />
  );
};

export const Switch = connect(
  SwitchComponent,
  mapProps((props: SwitchProps) => {
    const { checked, ...rest } = props;
    return {
      ...rest,
      checked: checked ?? false,
    };
  }),
  mapReadPretty(PreviewText.Switch)
);

export default Switch; 