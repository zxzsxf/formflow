import React from 'react';
import { useField } from '@formily/react';

export interface FieldDebugProps {
  name?: string;
  showFieldInfo?: boolean;
}

export const FieldDebug: React.FC<FieldDebugProps> = ({ name, showFieldInfo = true }) => {
  const field = useField<any>();
  
  if (!showFieldInfo) {
    return null;
  }

  return (
    <div style={{ 
      padding: '8px', 
      margin: '4px 0', 
      backgroundColor: '#f5f5f5', 
      border: '1px solid #d9d9d9', 
      borderRadius: '4px',
      fontSize: '12px',
      fontFamily: 'monospace'
    }}>
      <div><strong>Field Debug Info:</strong></div>
      <div>Name: {name || 'undefined'}</div>
      <div>Field exists: {field ? 'Yes' : 'No'}</div>
      {field && (
        <>
          <div>Field path: {field.path?.toString()}</div>
          <div>Field value: {JSON.stringify(field.value)}</div>
          <div>Field errors: {JSON.stringify(field.errors)}</div>
          <div>Field warnings: {JSON.stringify(field.warnings)}</div>
        </>
      )}
    </div>
  );
};

export default FieldDebug; 