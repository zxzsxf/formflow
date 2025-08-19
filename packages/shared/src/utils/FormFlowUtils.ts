import { FormField, FormData, FormState } from '../types/formTypes';
import { createInitialFormState, updateFormData, validateForm } from './formUtils';
import { validateField } from './validationUtils';

export default class FormFlowUtils {
  private fields: FormField[];
  private state: FormState;

  constructor(fields: FormField[]) {
    this.fields = fields;
    this.state = createInitialFormState(fields);
  }

  // 获取当前状态
  getState(): FormState {
    return this.state;
  }

  // 更新字段值
  updateField(fieldName: string, value: any): void {
    this.state = updateFormData(this.state, fieldName, value);
    this.validateField(fieldName);
    this.updateFormValidity();
  }

  // 验证单个字段
  validateField(fieldName: string): void {
    const field = this.fields.find(f => f.name === fieldName);
    if (field && field.validation) {
      const error = validateField(this.state.data[fieldName], field.validation);
      this.state.errors[fieldName] = error || '';
    }
  }

  // 验证整个表单
  validateForm(): void {
    const errors = validateForm(this.fields, this.state.data);
    this.state.errors = errors;
    this.updateFormValidity();
  }

  // 更新表单有效性
  private updateFormValidity(): void {
    const hasErrors = Object.values(this.state.errors).some(error => error !== '');
    this.state.isValid = !hasErrors;
  }

  // 重置表单
  reset(): void {
    this.state = createInitialFormState(this.fields);
  }

  // 获取表单数据
  getData(): FormData {
    return { ...this.state.data };
  }

  // 设置表单数据
  setData(data: FormData): void {
    this.state.data = { ...data };
    this.validateForm();
  }
} 