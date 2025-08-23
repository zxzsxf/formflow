# FlowForm 组件库

基于 Formily 和 Ant Design 的表单组件库，提供完整的表单解决方案。

## 安装

```bash
npm install @flowform/components
# 或
yarn add @flowform/components
```

## 基本用法

### 1. 创建表单实例

```tsx
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm({
  initialValues: {
    name: '',
    age: ''
  }
});
```

### 2. 使用表单组件

```tsx
import { Form, FormItem, Input } from '@flowform/components';

const MyForm = () => {
  return (
    <FormProvider form={form}>
      <Form>
        <FormItem label="姓名" name="name" required>
          <Input placeholder="请输入姓名" />
        </FormItem>
        
        <FormItem label="年龄" name="age" required>
          <Input placeholder="请输入年龄" />
        </FormItem>
      </Form>
    </FormProvider>
  );
};
```

## 重要说明：为什么 field 是 undefined？

在 Formily 中，`useField()` 返回 `undefined` 的主要原因：

### 1. 缺少 FormItem 包装

❌ **错误用法**：
```tsx
<Input /> // 直接使用，没有 FormItem 包装
```

✅ **正确用法**：
```tsx
<FormItem name="fieldName">
  <Input />
</FormItem>
```

### 2. FormItem 缺少 name 属性

❌ **错误用法**：
```tsx
<FormItem label="姓名">
  <Input />
</FormItem>
```

✅ **正确用法**：
```tsx
<FormItem label="姓名" name="name">
  <Input />
</FormItem>
```

### 3. 组件层级结构错误

❌ **错误用法**：
```tsx
<Form>
  <Input /> {/* 直接放在 Form 下 */}
</Form>
```

✅ **正确用法**：
```tsx
<Form>
  <FormItem name="name">
    <Input />
  </FormItem>
</Form>
```

## 字段调试

使用 `FieldDebug` 组件来调试字段连接状态：

```tsx
import { FieldDebug } from '@flowform/components';

<FormItem label="姓名" name="name">
  <Input />
  <FieldDebug name="name" />
</FormItem>
```

这会显示：
- 字段是否存在
- 字段路径
- 字段值
- 字段错误信息

## 组件列表

### 基础组件
- `Form` - 表单容器
- `FormItem` - 表单项包装器
- `Input` - 文本输入框
- `InputNumber` - 数字输入框
- `TextArea` - 多行文本输入框

### 选择组件
- `Select` - 下拉选择器
- `Checkbox` - 单选框
- `CheckboxGroup` - 复选框组
- `Radio` - 单选按钮
- `RadioGroup` - 单选按钮组

### 其他组件
- `DatePicker` - 日期选择器
- `Switch` - 开关
- `Upload` - 文件上传
- `FieldDebug` - 字段调试器

## 常见问题

### Q: 为什么 useField() 返回 undefined？
A: 确保组件被 FormItem 包装，且 FormItem 有 name 属性。

### Q: 如何获取字段值？
A: 使用 `field.value` 或通过表单实例的 `values` 属性。

### Q: 如何设置字段值？
A: 使用 `field.setValue(value)` 或表单实例的 `setValues()` 方法。

### Q: 如何监听字段变化？
A: 使用 `field.addPropertyListener()` 或表单实例的 `addPropertyListener()` 方法。

## 示例

查看 `src/example/example.tsx` 文件获取完整的使用示例。 