import React from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';
import dayjs from 'dayjs';

export interface DatePickerProps {
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  size?: 'large' | 'middle' | 'small';
  showTime?: boolean | object;
  format?: string;
  allowClear?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (date: any, dateString: string) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = (props) => {
  const { onChange } = props;
  const field = useField<any>();
  
  const handleChange = (date: any, dateString: string) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(dateString);
    // }
    if(typeof onChange === 'function') {
      onChange(date, dateString);
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
    <AntDatePicker
      {...props}
      // @ts-ignore
      value={field?.value ? field.value : undefined}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
};

export const DatePicker = connect(
  DatePickerComponent,
  mapProps((props: any) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? undefined,
    };
  }),
  mapReadPretty(PreviewText.Date)
);

export default DatePicker; 