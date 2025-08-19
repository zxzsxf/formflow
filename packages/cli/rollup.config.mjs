import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default defineConfig({
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    }
  ],
  external: ['commander', 'chalk', 'inquirer'],
  plugins: [
    nodeResolve(),
    commonjs()
  ]
}); 