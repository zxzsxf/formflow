import { FormField, FormData, FormState } from '../types/formTypes';

// 创建初始表单状态
export function createInitialFormState(fields: FormField[]): FormState {
  const data: FormData = {};
  const errors: { [key: string]: string } = {};
  
  fields.forEach(field => {
    data[field.name] = '';
    errors[field.name] = '';
  });
  
  return {
    data,
    errors,
    isValid: false,
    isDirty: false
  };
}

// 更新表单数据
export function updateFormData(
  currentState: FormState,
  fieldName: string,
  value: any
): FormState {
  return {
    ...currentState,
    data: {
      ...currentState.data,
      [fieldName]: value
    },
    isDirty: true
  };
}

// 检查表单是否有效
export function validateForm(fields: FormField[], data: FormData): { [key: string]: string } {
  const errors: { [key: string]: string } = {};
  
  fields.forEach(field => {
    if (field.required && !data[field.name]) {
      errors[field.name] = `${field.label} 是必填项`;
    }
  });
  
  return errors;
} 