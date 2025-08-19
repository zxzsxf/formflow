// 表单字段类型
export interface FormField {
  name: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'checkbox' | 'radio';
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: ValidationRule[];
}

// 验证规则
export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  value?: any;
  message: string;
}

// 表单数据
export interface FormData {
  [key: string]: any;
}

// 表单状态
export interface FormState {
  data: FormData;
  errors: { [key: string]: string };
  isValid: boolean;
  isDirty: boolean;
} 