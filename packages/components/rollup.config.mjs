import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  external: ['react', 'react-dom', '@formily/react', '@formily/core'],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    postcss({
      // extract: 'dist/index.css',
      minimize: true, // 压缩CSS
      inject: true, // 自动注入样式
      use: [
        "sass",
        ["less", { javascriptEnabled: true }]
      ], 
      plugins: [
        // require("postcss-import")(), // 处理@import语句
        // prefixer({
        //   prefix: '.ff
        //   ignoreFiles: [/.*\.module\.scss/, /.*\.global\.scss/]
        // }),
      ],
      // 支持CSS模块
      modules: false,
      // 自动添加浏览器前缀
      autoprefixer: true,
      // 输出sourcemap
      sourceMap: true
    }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript'
      ]
    })
  ]
}); 