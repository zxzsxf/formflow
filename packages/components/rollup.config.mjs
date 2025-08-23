import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import less from 'postcss-less';

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
  external: ['react', 'react-dom'],
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
      declaration: true,
      declarationMap: true,
      exclude: ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx']
    }),
    postcss({
      extract: true,
      minimize: true,
      extensions: ['.css', '.less'],
      use: ['less'],
      lessOptions: {
        javascriptEnabled: true,
        math: 'always',
        modifyVars: {
          '@root-entry-name': 'default'
        }
      }
    })
  ]
}); 