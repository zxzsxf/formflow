import { ValidationRule } from '../types/formTypes';

// 验证单个字段
export function validateField(
  value: any,
  rules: ValidationRule[]
): string | null {
  for (const rule of rules) {
    const error = validateRule(value, rule);
    if (error) return error;
  }
  return null;
}

// 验证单个规则
function validateRule(value: any, rule: ValidationRule): string | null {
  switch (rule.type) {
    case 'required':
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return rule.message || '此字段是必填项';
      }
      break;
      
    case 'minLength':
      if (typeof value === 'string' && value.length < rule.value) {
        return rule.message || `最少需要 ${rule.value} 个字符`;
      }
      break;
      
    case 'maxLength':
      if (typeof value === 'string' && value.length > rule.value) {
        return rule.message || `最多允许 ${rule.value} 个字符`;
      }
      break;
      
    case 'pattern':
      if (rule.value && typeof value === 'string' && !rule.value.test(value)) {
        return rule.message || '格式不正确';
      }
      break;
      
    case 'custom':
      if (rule.value && typeof rule.value === 'function') {
        const result = rule.value(value);
        if (result !== true) {
          return rule.message || result || '验证失败';
        }
      }
      break;
  }
  
  return null;
}

// 验证邮箱格式
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// 验证手机号格式
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^1[3-9]\d{9}$/;
  return phoneRegex.test(phone);
} 