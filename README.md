# FlowForm

FlowForm 是一个现代化的表单流程管理工具，提供完整的表单解决方案。

## 项目结构

```
@flowform/cli          // CLI工具
@flowform/components   // 组件库
@flowform/docs        // 文档
@flowform/pc          // PC端表单
@flowform/mobile      // 移动端表单
@flowform/loader      // 加载器插件
@flowform/shared      // 共享包
@flowform/example     // 示例
```

## 技术栈

- **Node版本**: 18.17.1
- **包管理**: Lerna + npm
- **构建工具**: Rollup
- **开发语言**: TypeScript/JavaScript
- **框架**: React

## 快速开始

### 安装依赖

```bash
npm install
```

### 初始化项目

```bash
npm run bootstrap
```

### 构建项目

```bash
npm run build
```

### 开发模式

```bash
npm run dev
```

## 包说明

### @flowform/cli
CLI工具，支持全局安装和项目内安装，提供项目初始化和构建命令。

### @flowform/components
React组件库，提供基础的表单组件。

### @flowform/loader
Webpack loader插件，在HTML编译时插入内容。

### @flowform/shared
共享工具包，包含表单验证、工具函数等。

### @flowform/pc & @flowform/mobile
分别提供PC端和移动端的表单解决方案。

### @flowform/example
示例项目，展示如何使用FlowForm。

## 开发指南

1. 确保Node版本为18.17.1
2. 使用npm安装依赖
3. 使用Lerna管理多包项目
4. 使用Rollup进行构建

## 许可证

MIT
