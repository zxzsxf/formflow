#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 颜色输出
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

function logInfo(message) {
  log(`ℹ️  ${message}`, 'blue');
}

// 获取命令行参数
const args = process.argv.slice(2);
const target = args[0] || 'help';

// 项目根目录
const rootDir = path.resolve(__dirname, '..');
const packagesDir = path.join(rootDir, 'packages');

// 清理函数
function cleanDist() {
  logInfo('清理所有包的 dist 目录...');
  const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  packages.forEach(pkg => {
    const distPath = path.join(packagesDir, pkg, 'dist');
    if (fs.existsSync(distPath)) {
      try {
        fs.rmSync(distPath, { recursive: true, force: true });
        logSuccess(`已清理 ${pkg}/dist`);
      } catch (error) {
        logError(`清理 ${pkg}/dist 失败: ${error.message}`);
      }
    }
  });
}

function cleanNodeModules() {
  logInfo('清理所有 node_modules 目录...');
  
  // 清理根目录的 node_modules
  const rootNodeModules = path.join(rootDir, 'node_modules');
  if (fs.existsSync(rootNodeModules)) {
    try {
      fs.rmSync(rootNodeModules, { recursive: true, force: true });
      logSuccess('已清理根目录 node_modules');
    } catch (error) {
      logError(`清理根目录 node_modules 失败: ${error.message}`);
    }
  }

  // 清理各包的 node_modules
  const packages = fs.readdirSync(packagesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  packages.forEach(pkg => {
    const nodeModulesPath = path.join(packagesDir, pkg, 'node_modules');
    if (fs.existsSync(nodeModulesPath)) {
      try {
        fs.rmSync(nodeModulesPath, { recursive: true, force: true });
        logSuccess(`已清理 ${pkg}/node_modules`);
      } catch (error) {
        logError(`清理 ${pkg}/node_modules 失败: ${error.message}`);
      }
    }
  });
}

function cleanYarnCache() {
  logInfo('清理 Yarn 缓存...');
  const yarnCachePath = path.join(rootDir, '.yarn', 'cache');
  if (fs.existsSync(yarnCachePath)) {
    try {
      fs.rmSync(yarnCachePath, { recursive: true, force: true });
      logSuccess('已清理 Yarn 缓存');
    } catch (error) {
      logError(`清理 Yarn 缓存失败: ${error.message}`);
    }
  }
}

function cleanAll() {
  logInfo('执行完整清理...');
  cleanDist();
  cleanNodeModules();
  cleanYarnCache();
  
  // 清理其他可能的构建产物
  const otherDirs = ['.nyc_output', 'coverage', '.lerna'];
  otherDirs.forEach(dir => {
    const dirPath = path.join(rootDir, dir);
    if (fs.existsSync(dirPath)) {
      try {
        fs.rmSync(dirPath, { recursive: true, force: true });
        logSuccess(`已清理 ${dir}`);
      } catch (error) {
        logWarning(`清理 ${dir} 失败: ${error.message}`);
      }
    }
  });
}

function showHelp() {
  log('FormFlow 清理脚本使用说明:', 'cyan');
  log('');
  log('用法:', 'yellow');
  log('  node scripts/clean.js [选项]', 'blue');
  log('');
  log('选项:', 'yellow');
  log('  dist         清理所有包的 dist 目录', 'blue');
  log('  modules      清理所有 node_modules 目录', 'blue');
  log('  cache        清理 Yarn 缓存', 'blue');
  log('  all          执行完整清理（dist + modules + cache）', 'blue');
  log('  help         显示此帮助信息', 'blue');
  log('');
  log('示例:', 'yellow');
  log('  node scripts/clean.js dist      # 只清理构建产物', 'blue');
  log('  node scripts/clean.js modules   # 只清理依赖', 'blue');
  log('  node scripts/clean.js all       # 完整清理', 'blue');
  log('');
  log('或者使用 npm/yarn 脚本:', 'yellow');
  log('  yarn clean:dist:all             # 清理所有 dist', 'blue');
  log('  yarn clean:modules:all          # 清理所有 node_modules', 'blue');
  log('  yarn clean:full                 # 完整清理', 'blue');
}

// 主函数
function main() {
  log('🧹 FormFlow 清理脚本', 'magenta');
  log('');

  switch (target) {
    case 'dist':
      cleanDist();
      break;
    case 'modules':
      cleanNodeModules();
      break;
    case 'cache':
      cleanYarnCache();
      break;
    case 'all':
      cleanAll();
      break;
    case 'help':
    default:
      showHelp();
      break;
  }

  log('');
  log('清理完成！', 'green');
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = {
  cleanDist,
  cleanNodeModules,
  cleanYarnCache,
  cleanAll
}; 