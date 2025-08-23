# FlowForm 项目启动指南

## 🚀 快速开始

### 环境要求

- **Node.js**: 18.17.1 (必须)
- **Yarn**: >= 4.0.0 (推荐使用 Yarn Berry)
- **操作系统**: 支持 macOS、Windows、Linux

### 检查环境

在开始之前，请确保你的环境满足要求：

```bash
# 检查Node.js版本
node --version
# 应该输出: v18.17.1

# 检查Yarn版本
yarn --version
# 应该输出: >= 4.0.0
```

如果版本不匹配，请使用nvm或其他版本管理工具安装正确的Node.js版本：

```bash
# 使用nvm安装指定版本
nvm install 18.17.1
nvm use 18.17.1
```

## 📦 项目初始化

### 1. 克隆项目

```bash
git clone <your-repository-url>
cd flowform
```

### 2. 安装依赖

```bash
# 安装根目录依赖
yarn install

# 注意：不需要运行 bootstrap 命令，Lerna v7 会自动处理工作区
```

### 3. 验证安装

```bash
# 检查所有包是否正确安装
npx lerna list

# 应该看到类似输出：
# @flowform/cli
# @flowform/components
# @flowform/docs
# @flowform/pc
# @flowform/mobile
# @flowform/loader
# @flowform/shared
# @flowform/example
```

## 🛠️ 开发工作流

### 构建项目

```bash
# 构建所有包
yarn build

# 构建特定包
npx lerna run build --scope=@flowform/components
npx lerna run build --scope=@flowform/cli
```

### 开发模式

```bash
# 启动所有包的开发模式
yarn dev

# 启动特定包的开发模式
npx lerna run dev --scope=@flowform/components --stream
```

### 清理构建

```bash
# 清理所有包的构建文件
yarn clean

# 清理特定包
npx lerna run clean --scope=@flowform/components
```

## 📚 各包使用说明

### @flowform/shared

共享工具和类型定义：

```typescript
// 导入类型
import { FormField, FormData, FormState } from '@flowform/shared';

// 导入工具函数
import { createInitialFormState, validateForm } from '@flowform/shared';

// 导入工具类
import FlowFormUtils from '@flowform/shared';
```

### @flowform/components

React组件库：

```bash
# 在项目中使用
yarn add @flowform/components

# 导入组件
import { Form, FormField, FormButton, FlowForm } from '@flowform/components';
```

### @flowform/mobile

移动端表单组件：

```typescript
import { MobileForm, MobileFormField, MobileFlowForm } from '@flowform/mobile';

// 使用移动端优化的表单组件
<MobileFlowForm
  fields={[
    { name: 'username', type: 'text', label: '用户名', required: true },
    { name: 'email', type: 'email', label: '邮箱', required: true }
  ]}
  onSubmit={handleSubmit}
/>
```

### @flowform/pc

PC端表单组件：

```typescript
import { PCForm, PCFormField, PCFlowForm } from '@flowform/pc';

// 使用PC端优化的表单组件
<PCFlowForm
  fields={[
    { name: 'username', type: 'text', label: '用户名', required: true },
    { name: 'email', type: 'email', label: '邮箱', required: true }
  ]}
  onSubmit={handleSubmit}
/>
```

### @flowform/loader

Webpack loader插件：

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: '@flowform/loader',
            options: {
              insertContent: '<script src="flowform.js"></script>'
            }
          }
        ]
      }
    ]
  }
};
```

### @flowform/cli

CLI工具，支持全局安装和本地使用：

```bash
# 全局安装
yarn global add @flowform/cli

# 使用CLI命令
flowform init
flowform build

# 本地使用
npx @flowform/cli init
npx @flowform/cli build
```

### @flowform/example

示例项目：

```bash
# 进入示例目录
cd packages/example

# 启动开发服务器
yarn dev

# 构建示例
yarn build
```

## 🔧 问题解决记录

### ✅ 已解决的问题

#### 1. Node.js 版本不匹配
**问题**: 系统使用 Node.js 16.20.2，但项目要求 18.17.1
**解决**: 使用 nvm 切换到正确的版本
```bash
nvm use 18.17.1
```

#### 2. 包管理器配置冲突
**问题**: lerna.json 配置为使用 npm，但项目使用 yarn
**解决**: 修改 lerna.json 中的 npmClient 为 yarn
```json
{
  "npmClient": "yarn"
}
```

#### 3. Yarn 版本过旧
**问题**: 使用 Yarn Classic (v1.22.21)，不支持 workspace:* 语法
**解决**: 升级到 Yarn Berry (v4.9.2)
```bash
corepack enable
yarn set version berry
```

#### 4. Lerna 配置过时
**问题**: Lerna v7 移除了 useWorkspaces 选项和 bootstrap 命令
**解决**: 更新 lerna.json 配置，移除过时选项
```json
{
  "version": "1.0.0",
  "npmClient": "yarn",
  "packages": ["packages/*"]
}
```

#### 5. Rollup 配置文件格式
**问题**: Rollup 配置文件使用 ES 模块语法，但 Node.js 以 CommonJS 模式运行
**解决**: 将所有 rollup.config.js 重命名为 rollup.config.mjs

#### 6. 缺失的依赖
**问题**: @rollup/plugin-typescript 需要 tslib 依赖
**解决**: 安装 tslib 依赖
```bash
yarn add -D tslib
```

#### 7. 缺失的源文件
**问题**: 多个包只有 index.ts 文件，缺少实际实现
**解决**: 创建所有必需的组件和工具文件

### 🚨 当前状态

- ✅ 所有包都能成功构建
- ✅ 依赖安装完成
- ✅ 工作区配置正确
- ✅ 开发环境就绪

## 📁 项目结构说明

```
flowform/
├── packages/
│   ├── cli/           # CLI工具
│   ├── components/    # 组件库 (React组件)
│   ├── docs/         # 文档站点
│   ├── pc/           # PC端表单组件
│   ├── mobile/       # 移动端表单组件
│   ├── loader/       # Webpack loader插件
│   ├── shared/       # 共享工具和类型
│   └── example/      # 示例项目
├── package.json       # 根配置
├── lerna.json        # Lerna配置 (v7)
├── tsconfig.json     # TypeScript配置
├── .yarn/            # Yarn Berry配置
├── yarn.lock         # 依赖锁定文件
└── README.md         # 项目说明
```

## 🚀 部署说明

### 发布到npm

```bash
# 发布所有包
yarn publish

# 发布特定包
npx lerna publish --scope=@flowform/components
```

### 构建生产版本

```bash
# 构建所有包
yarn build

# 检查构建输出
ls packages/*/dist/
```

## 📝 开发规范

### 代码风格

- 使用TypeScript进行类型检查
- 遵循ESLint规则
- 使用Prettier格式化代码

### 提交规范

```bash
# 使用conventional commits
git commit -m "feat: add new form component"
git commit -m "fix: resolve build issue"
git commit -m "docs: update README"
```

### 测试

```bash
# 运行所有测试
yarn test

# 运行特定包的测试
npx lerna run test --scope=@flowform/components
```

## 🔗 相关链接

- [Lerna文档](https://lerna.js.org/)
- [Rollup文档](https://rollupjs.org/)
- [TypeScript文档](https://www.typescriptlang.org/)
- [React文档](https://reactjs.org/)
- [Yarn Berry文档](https://yarnpkg.com/)

## 📞 技术支持

如果在使用过程中遇到问题，请：

1. 检查环境版本是否正确
2. 查看控制台错误信息
3. 参考问题解决记录
4. 提交Issue到项目仓库

## 🎯 下一步计划

- [ ] 完善组件功能
- [ ] 添加单元测试
- [ ] 完善文档
- [ ] 添加示例和演示
- [ ] 性能优化
- [ ] 国际化支持

---

**项目已成功启动，可以开始开发！** 🎉 