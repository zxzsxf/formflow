import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodePolyfills from "@rollup/plugin-node-resolve";
import { copyFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// 获取当前文件的目录路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    input: "./src/index.ts",
    output: {
      dir: "dist",
      format: "cjs",
      entryFileNames: "[name].cjs.js",
    },
    plugins: [
      nodePolyfills({ preferBuiltins: true }),
      commonjs(),
      typescript(),
      json(),
      // 添加自定义插件来复制 bin 文件
      {
        name: 'copy-bin-files',
        writeBundle() {
          // 确保 dist/bin 目录存在
          const binDir = join(__dirname, 'dist/bin');
          if (!existsSync(binDir)) {
            mkdirSync(binDir, { recursive: true });
          }
          
          // 复制 bin 文件到 dist 目录
          const srcBinFile = join(__dirname, 'src/bin/index.js');
          const distBinFile = join(__dirname, 'dist/bin/index.js');
          copyFileSync(srcBinFile, distBinFile);
        }
      }
    ],
    external: [/react\//],
  },
];
