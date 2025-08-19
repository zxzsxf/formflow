import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

export const PreviewText = {
  Input: ({ value }: { value?: any }) => {
    return <Text>{value || '-'}</Text>;
  },
  
  Number: ({ value }: { value?: any }) => {
    return <Text>{value || '-'}</Text>;
  },
  
  TextArea: ({ value }: { value?: any }) => {
    return <Text>{value || '-'}</Text>;
  },
  
  Select: ({ value, options }: { value?: any; options?: Array<{ value: any; label: string }> }) => {
    if (!options || !Array.isArray(options)) {
      return <Text>{value || '-'}</Text>;
    }
    
    const option = options.find(opt => opt.value === value);
    return <Text>{option?.label || value || '-'}</Text>;
  },
  
  Checkbox: ({ value }: { value?: any }) => {
    return <Text>{value ? '是' : '否'}</Text>;
  },
  
  CheckboxGroup: ({ value }: { value?: any }) => {
    if (!value || !Array.isArray(value)) {
      return <Text>-</Text>;
    }
    return <Text>{value.join(', ')}</Text>;
  },
  
  Radio: ({ value, options }: { value?: any; options?: Array<{ value: any; label: string }> }) => {
    if (!options || !Array.isArray(options)) {
      return <Text>{value || '-'}</Text>;
    }
    
    const option = options.find(opt => opt.value === value);
    return <Text>{option?.label || value || '-'}</Text>;
  },
  
  Switch: ({ value }: { value?: any }) => {
    return <Text>{value ? '是' : '否'}</Text>;
  },
  
  Date: ({ value }: { value?: any }) => {
    if (!value) return <Text>-</Text>;
    
    try {
      const date = new Date(value);
      return <Text>{date.toLocaleDateString()}</Text>;
    } catch {
      return <Text>{value}</Text>;
    }
  },
  
  DateTime: ({ value }: { value?: any }) => {
    if (!value) return <Text>-</Text>;
    
    try {
      const date = new Date(value);
      return <Text>{date.toLocaleString()}</Text>;
    } catch {
      return <Text>{value}</Text>;
    }
  },
  
  Upload: ({ value }: { value?: any }) => {
    if (!value || !Array.isArray(value)) {
      return <Text>-</Text>;
    }
    return <Text>{value.length} 个文件</Text>;
  }
}; 