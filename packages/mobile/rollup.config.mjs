import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  input: 'src/index.tsx',
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
  external: [
    'react', 
    'react-dom', 
    '@flowform/shared',
    '@formily/antd',
    '@formily/core',
    '@formily/react',
    '@formily/reactive',
    '@formily/reactive-react',
    '@formily/shared',
    'antd'
  ],
  plugins: [
    nodeResolve({
      alias: {
        '@flowform/components': resolve(__dirname, '../components/dist')
      },
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs({
      ignore: ['@formily/antd/**/*.less', 'antd/**/*.less']
    }),
    typescript({
      tsconfig: './tsconfig.json'
    })
  ]
}); 