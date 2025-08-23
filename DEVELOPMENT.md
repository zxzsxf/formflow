# FlowForm 开发环境设置指南

## 🚀 快速开始

### 1. 环境要求
- **Node.js**: 18.17.1 (必须)
- **包管理器**: Yarn
- **操作系统**: Windows/macOS/Linux

### 2. 安装 Node.js 18.17.1

#### 使用 nvm (推荐)
```bash
# 安装 nvm
# Windows: https://github.com/coreybutler/nvm-windows
# macOS/Linux: https://github.com/nvm-sh/nvm

# 安装 Node.js 18.17.1
nvm install 18.17.1
nvm use 18.17.1

# 验证版本
node --version
# 应该输出: v18.17.1
```

#### 直接安装
- 访问 [Node.js 官网](https://nodejs.org/)
- 下载并安装 18.17.1 LTS 版本

### 3. 安装 Yarn
```bash
npm install -g yarn

# 验证安装
yarn --version
```

### 4. 克隆项目
```bash
git clone <repository-url>
cd flowform
```

### 5. 安装依赖
```bash
yarn install
```

### 6. 环境检查
```bash
yarn check-env
```

### 7. 启动开发环境
```bash
yarn dev
```

## 🔧 开发工具配置

### VS Code 推荐扩展
- TypeScript Importer
- ESLint
- Prettier
- Auto Rename Tag
- Bracket Pair Colorizer

### VS Code 设置
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## 📁 项目结构
```
flowform/
├── packages/
│   ├── components/     # 核心组件库
│   ├── pc/            # PC端组件
│   ├── mobile/        # 移动端组件
│   ├── shared/        # 共享工具
│   ├── cli/           # 命令行工具
│   └── loader/        # 加载器
├── scripts/            # 构建脚本
├── .cursorrules        # Cursor 规则配置
├── .nvmrc             # Node.js 版本配置
└── package.json        # 项目配置
```

## 🛠️ 常用命令

### 开发命令
```bash
yarn dev              # 启动开发环境
yarn build            # 构建所有包
yarn test             # 运行测试
yarn lint             # 代码检查
yarn clean            # 清理构建文件
```

### 包管理命令
```bash
yarn bootstrap        # 初始化所有包
yarn clean:full       # 完全清理
yarn clean:yarn       # 清理 Yarn 缓存
```

### 环境检查
```bash
yarn check-env        # 检查开发环境
```

## ⚠️ 常见问题

### Node.js 版本不正确
```bash
# 错误信息: Node.js 版本不正确，需要 v18.17.1
# 解决方案:
nvm use 18.17.1
# 或者重新安装正确版本
```

### 依赖安装失败
```bash
# 清理缓存后重试
yarn cache clean
yarn install
```

### 构建失败
```bash
# 清理构建文件后重试
yarn clean:dist:all
yarn install
yarn build
```

### TypeScript 类型错误
```bash
# 检查类型定义
yarn lint
# 或者单独检查 TypeScript
npx tsc --noEmit
```

## 📚 相关文档
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [React 官方文档](https://reactjs.org/)
- [Rollup 官方文档](https://rollupjs.org/)
- [Lerna 官方文档](https://lerna.js.org/)

## 🤝 贡献指南
1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📞 技术支持
如果遇到问题，请：
1. 查看本文档
2. 检查 GitHub Issues
3. 创建新的 Issue 并描述问题
