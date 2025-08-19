#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');

const program = new Command();

program
  .name('formflow')
  .description('FormFlow CLI工具')
  .version('1.0.0');

program
  .command('init')
  .description('初始化FormFlow项目')
  .action(() => {
    console.log(chalk.green('初始化FormFlow项目...'));
  });

program
  .command('build')
  .description('构建项目')
  .action(() => {
    console.log(chalk.blue('构建项目...'));
  });

program.parse(); 