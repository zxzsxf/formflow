import React from 'react';
import { Radio as AntRadio } from 'antd';
import { useField, observer } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  value?: string;
  options?: RadioOption[];
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'small' | 'large' | 'middle';
  className?: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
}

const RadioGroupComponent: React.FC<RadioGroupProps> = observer((props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = async (value: any) => {
    // if (field && typeof field.onInput === 'function') {
    //   try {
    //     // onInput 是异步方法，需要等待完成
    //     await field.onInput(value);
    //     console.log('*****field.value after onInput:', field.value);
    //   } catch (error) {
    //     console.error('RadioGroup onInput error:', error);
    //   }
    // }
    if(typeof onChange === 'function') {
      onChange(value);
    }
  };

  // 使用 field.value 作为受控值，确保响应式更新
  const fieldValue = field?.value;
  console.log('*****RadioGroup render, fieldValue:', fieldValue);

  return (
    <AntRadio.Group
      {...props}
      value={fieldValue || ''}
      onChange={handleChange}
    />
  );
});

export const RadioGroup = connect(
  RadioGroupComponent,
  mapProps((props: RadioGroupProps) => {
    // 不要覆盖 value，让组件使用 field.value
    const { value, ...rest } = props;
    return {
      ...rest,
      // 移除 value 的覆盖，让组件内部使用 field.value
    };
  }),
  mapReadPretty(PreviewText.Radio)
);

export default RadioGroup; 