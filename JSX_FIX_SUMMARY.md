# JSX 运行时错误修复总结

## 问题描述

错误信息：`此 JSX 标记要求模块路径 'react/jsx-runtime' 存在，但找不到任何路径。请确保已安装相应包的类型。ts(2875)`

## 问题原因

这个错误通常由以下原因引起：

1. TypeScript 配置中 JSX 模式设置不正确
2. 缺少必要的 React 类型定义
3. JSX 运行时配置不完整

## 修复方案

### 1. 修改 TypeScript 配置

将 JSX 模式从 `react-jsx` 改为 `react`：

**根目录 tsconfig.json:**

```json
{
  "compilerOptions": {
    "jsx": "react",  // 从 "react-jsx" 改为 "react"
    "typeRoots": ["./node_modules/@types", "./types.d.ts"]
  }
}
```

**components 包 tsconfig.json:**

```json
{
  "compilerOptions": {
    "jsx": "react",  // 从 "react-jsx" 改为 "react"
    "typeRoots": ["./node_modules/@types", "./src/types.d.ts"]
  }
}
```

### 2. 创建类型声明文件

在根目录创建 `types.d.ts`：

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

declare module 'react/jsx-runtime' {
  const jsx: any;
  const jsxs: any;
  const Fragment: any;
  export { jsx, jsxs, Fragment };
}
```

### 3. 添加 Babel 配置

创建 `babel.config.js` 确保 JSX 转换正确：

```javascript
module.exports = {
  presets: [
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
```

### 4. 更新依赖

在 `package.json` 中添加必要的 babel 依赖：

```json
{
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "@babel/preset-typescript": "^7.0.0"
  }
}
```

## 修复后的效果

- JSX 语法不再报错
- TypeScript 能够正确识别 JSX 元素
- 组件编译正常

## 注意事项

1. 使用 `jsx: "react"` 模式需要确保 React 在作用域内
2. 所有组件文件都需要导入 React：`import React from 'react'`
3. 如果使用 `jsx: "react-jsx"` 模式，需要确保 React 17+ 和正确的运行时配置

## 推荐配置

对于现代 React 项目，推荐使用：

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

但需要确保：

- React 版本 >= 17
- 正确的运行时配置
- 所有依赖正确安装
