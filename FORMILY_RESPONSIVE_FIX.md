# Formily 响应式更新问题修复

## 问题描述

在使用 Formily 组件时，发现以下问题：
1. `field.value` 有值，但组件没有重新渲染
2. 组件没有回显最新的字段值
3. 字段值更新后，UI 没有响应式变化

## 问题原因

### 1. 缺少 `observer` 包装
Formily 需要 `observer` 来监听字段值变化并触发组件重新渲染。

**错误用法：**
```tsx
const Component = (props) => {
  const field = useField();
  return <div>{field.value}</div>;
};
```

**正确用法：**
```tsx
const Component = observer((props) => {
  const field = useField();
  return <div>{field.value}</div>;
});
```

### 2. `mapProps` 覆盖了字段值
在 `connect` 的 `mapProps` 中覆盖 `value` 属性，导致组件无法使用 `field.value`。

**错误用法：**
```tsx
export const Component = connect(
  ComponentComponent,
  mapProps((props) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      value: value ?? '', // ❌ 这会覆盖 field.value
    };
  })
);
```

**正确用法：**
```tsx
export const Component = connect(
  ComponentComponent,
  mapProps((props) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      // ✅ 不覆盖 value，让组件内部使用 field.value
    };
  })
);
```

## 修复方案

### 1. 添加 `observer` 包装
```tsx
import { observer } from '@formily/react';

const RadioGroupComponent: React.FC<RadioGroupProps> = observer((props) => {
  const field = useField<any>();
  // ... 组件逻辑
});
```

### 2. 修复 `mapProps` 中的值覆盖
```tsx
export const RadioGroup = connect(
  RadioGroupComponent,
  mapProps((props: RadioGroupProps) => {
    const { value, ...rest } = props;
    return {
      ...rest,
      // 移除 value 的覆盖，让组件内部使用 field.value
    };
  })
);
```

### 3. 确保使用 `field.value` 作为受控值
```tsx
const fieldValue = field?.value;

return (
  <AntRadio.Group
    {...props}
    value={fieldValue || ''} // 使用 field.value
    onChange={handleChange}
  />
);
```

## 已修复的组件

- ✅ `RadioGroup` - 添加了 `observer` 包装，修复了值覆盖问题
- ✅ `Input` - 添加了 `observer` 包装，修复了值覆盖问题

## 测试验证

使用 `test-radio.tsx` 文件来测试修复效果：

1. 选择不同的单选按钮选项
2. 输入不同的文本内容
3. 使用手动更新按钮测试响应式更新
4. 检查控制台日志确认字段值更新

## 关键要点

1. **所有 Formily 组件都必须使用 `observer` 包装**
2. **不要在 `mapProps` 中覆盖 `value` 属性**
3. **组件内部使用 `field.value` 作为受控值**
4. **确保组件被 `FormItem` 包装并提供了 `name` 属性**

## 常见错误

### ❌ 错误用法
```tsx
// 1. 没有 observer
const Component = (props) => { ... };

// 2. mapProps 覆盖 value
mapProps((props) => ({ ...props, value: props.value }));

// 3. 直接使用 props.value 而不是 field.value
value={props.value}
```

### ✅ 正确用法
```tsx
// 1. 使用 observer
const Component = observer((props) => { ... });

// 2. mapProps 不覆盖 value
mapProps((props) => ({ ...props }));

// 3. 使用 field.value
value={field?.value || ''}
``` 