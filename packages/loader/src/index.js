const loaderUtils = require('loader-utils');

module.exports = function(source) {
  const options = loaderUtils.getOptions(this);
  
  // 在HTML编译时插入内容
  const insertContent = options.insertContent || '';
  
  // 简单的字符串替换示例
  const result = source.replace(
    /<\/head>/,
    `${insertContent}\n</head>`
  );
  
  return result;
}; 