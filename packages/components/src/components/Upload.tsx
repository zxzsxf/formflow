import React from 'react';
import { Upload as AntUpload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useField } from '@formily/react';
import { connect, mapProps, mapReadPretty } from '@formily/react';
import { PreviewText } from './PreviewText';

export interface UploadProps {
  value?: any[];
  accept?: string;
  maxCount?: number;
  listType?: 'text' | 'picture' | 'picture-card';
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (info: any) => void;
  onRemove?: (file: any) => void;
}

const UploadComponent: React.FC<UploadProps> = (props) => {
  const { onChange, onRemove } = props;
  const field = useField<any>();
  
  const handleChange = (info: any) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(info.fileList);
    // }
    if(typeof onChange === 'function') {
      onChange(info);
    }
  };

  const handleRemove = (file: any) => {
    // if (field && typeof field.onInput === 'function') {
    //   const fileList = field.value || [];
    //   const newFileList = fileList.filter((item: any) => item.uid !== file.uid);
    //   field.onInput(newFileList);
    // }
    if(typeof onRemove === 'function') {
      onRemove(file);
    }
  };

  const handleInput = (fileList: any[]) => {
    // if (field && typeof field.onInput === 'function') {
    //   field.onInput(fileList);
    // }
    if(typeof onChange === 'function') {
      onChange({ fileList });
    }
  };

  return (
    <AntUpload
      {...props}
      fileList={field?.value || []}
      onChange={handleChange}
      onRemove={handleRemove}
      disabled={props.disabled || props.readOnly}
    >
      {/* @ts-ignore */}
      <Button icon={<UploadOutlined />}>点击上传</Button>
    </AntUpload>
  );
};

export const Upload = connect(
  UploadComponent,
  mapProps((props: UploadProps) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? [],
    };
  }),
  mapReadPretty(PreviewText.Upload)
);

export default Upload; 