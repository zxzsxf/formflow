# FormFlow Components Lint 错误修复总结

## 主要问题

### 1. 模块依赖问题
- **问题**: 无法找到 `antd`、`@formily/react` 等模块
- **原因**: 依赖未正确安装或 Node.js 版本不兼容
- **解决方案**: 
  - 升级 Node.js 到 18.17.1 或更高版本
  - 重新安装依赖：`npm install` 或 `yarn install`

### 2. TypeScript 配置问题
- **问题**: JSX 元素隐式具有 `any` 类型
- **原因**: TypeScript 配置中缺少 React JSX 支持
- **解决方案**: 在 tsconfig.json 中添加：
  ```json
  {
    "compilerOptions": {
      "jsx": "react-jsx",
      "lib": ["ES2020", "DOM", "DOM.Iterable"]
    }
  }
  ```

### 3. 类型定义问题
- **问题**: 多处使用 `any` 类型
- **修复位置**:
  - `FormField.tsx`: 修复 value 和 onChange 类型
  - `Input.tsx`: 修复 props 类型
  - `InputNumber.tsx`: 修复 props 类型
  - `TextArea.tsx`: 修复 props 类型
  - `Select.tsx`: 修复 props 类型
  - `Checkbox.tsx`: 修复 props 类型
  - `CheckboxGroup.tsx`: 修复 props 类型
  - `Radio.tsx`: 修复 props 类型
  - `RadioGroup.tsx`: 修复 props 类型
  - `DatePicker.tsx`: 修复 props 类型
  - `Switch.tsx`: 修复 props 类型
  - `Upload.tsx`: 修复 props 类型

### 4. 组件引用问题
- **问题**: `FormFlow.tsx` 引用了不存在的 `FormButton` 组件
- **解决方案**: 移除不存在的导入或创建该组件

### 5. 属性使用问题
- **问题**: `example.tsx` 中使用了不存在的 `layout` 属性
- **解决方案**: 移除不存在的属性或使用正确的属性名

## 修复步骤

1. **环境准备**:
   ```bash
   # 升级 Node.js 到 18.17.1+
   # 重新安装依赖
   npm install
   ```

2. **TypeScript 配置修复**:
   - 确保 tsconfig.json 包含正确的 JSX 配置
   - 添加必要的类型库

3. **类型定义修复**:
   - 将所有 `any` 类型替换为具体类型
   - 为组件 props 添加正确的接口定义

4. **组件修复**:
   - 创建缺失的组件（如 FormItem）
   - 修复组件间的引用关系

5. **运行 lint 检查**:
   ```bash
   npm run lint
   npm run lint:fix
   ```

## 建议的 ESLint 配置

```javascript
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    '@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': 'warn',
    'prefer-const': 'warn',
    'no-var': 'error',
  },
};
```

## 注意事项

- 修复过程中不要修改文案内容
- 保持代码的功能性不变
- 优先使用 TypeScript 的类型系统而不是 `any`
- 确保所有组件都有正确的类型定义 