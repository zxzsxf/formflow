#!/usr/bin/env node

/**
 * 开发环境检查脚本
 * 检查 Node.js 版本、包管理器等环境要求
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 检查 FlowForm 开发环境...\n');

// 检查 Node.js 版本
function checkNodeVersion() {
  try {
    const nodeVersion = process.version;
    const requiredVersion = '18.17.1';
    
    console.log(`📦 Node.js 版本: ${nodeVersion}`);
    
    if (nodeVersion.includes('v18.17.1')) {
      console.log('✅ Node.js 版本正确');
      return true;
    } else {
      console.log(`❌ Node.js 版本不正确，需要 v${requiredVersion}`);
      console.log('💡 请使用以下命令切换版本:');
      console.log(`   nvm use ${requiredVersion}`);
      return false;
    }
  } catch (error) {
    console.log('❌ 无法检查 Node.js 版本');
    return false;
  }
}

// 检查包管理器
function checkPackageManager() {
  try {
    if (fs.existsSync(path.join(process.cwd(), 'yarn.lock'))) {
      console.log('✅ 检测到 yarn.lock，项目使用 Yarn 包管理器');
      return true;
    } else if (fs.existsSync(path.join(process.cwd(), 'package-lock.json'))) {
      console.log('⚠️  检测到 package-lock.json，建议使用 Yarn');
      return false;
    } else {
      console.log('❌ 未检测到包管理器锁定文件');
      return false;
    }
  } catch (error) {
    console.log('❌ 无法检查包管理器');
    return false;
  }
}

// 检查依赖是否安装
function checkDependencies() {
  try {
    if (fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
      console.log('✅ 依赖已安装');
      return true;
    } else {
      console.log('❌ 依赖未安装，请运行: yarn install');
      return false;
    }
  } catch (error) {
    console.log('❌ 无法检查依赖状态');
    return false;
  }
}

// 检查 TypeScript 配置
function checkTypeScript() {
  try {
    if (fs.existsSync(path.join(process.cwd(), 'tsconfig.json'))) {
      console.log('✅ TypeScript 配置存在');
      return true;
    } else {
      console.log('❌ TypeScript 配置缺失');
      return false;
    }
  } catch (error) {
    console.log('❌ 无法检查 TypeScript 配置');
    return false;
  }
}

// 主检查流程
function main() {
  const checks = [
    checkNodeVersion,
    checkPackageManager,
    checkDependencies,
    checkTypeScript
  ];
  
  let passed = 0;
  let total = checks.length;
  
  checks.forEach(check => {
    if (check()) passed++;
    console.log('');
  });
  
  console.log('📊 检查结果:');
  console.log(`✅ 通过: ${passed}/${total}`);
  
  if (passed === total) {
    console.log('🎉 环境检查通过！可以开始开发了');
    console.log('\n🚀 常用命令:');
    console.log('   yarn dev      - 启动开发环境');
    console.log('   yarn build    - 构建项目');
    console.log('   yarn test     - 运行测试');
    console.log('   yarn lint     - 代码检查');
  } else {
    console.log('⚠️  环境检查未完全通过，请解决上述问题后重试');
    process.exit(1);
  }
}

// 运行检查
if (require.main === module) {
  main();
}

module.exports = { main };
