import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@flowform/pc': resolve(__dirname, '../pc/src'),
      '@flowform/components': resolve(__dirname, '../components/src'),
      '@flowform/mobile': resolve(__dirname, '../mobile/src'),
      '@flowform/shared': resolve(__dirname, '../shared/src'),
      '@flowform/utils': resolve(__dirname, '../utils/src'),
      '@flowform/hooks': resolve(__dirname, '../hooks/src'),
      '@flowform/types': resolve(__dirname, '../types/src'),
      '@flowform/mockSchema': resolve(__dirname, '../mockSchema/src'),
      '@flowform/example': resolve(__dirname, '../example/src'),
      '@flowform/editor': resolve(__dirname, '../editor/src'),
      // 添加 antd 路径别名
      '~antd': resolve(__dirname, '../../node_modules/antd'),
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          'root-entry-name': 'default',
        },
        additionalData: `@import "${resolve(__dirname, 'src/styles/global.less')}";`,
        paths: [
          resolve(__dirname, 'node_modules'),
          resolve(__dirname, '../node_modules'),
          resolve(__dirname, '../../node_modules'),
        ],
      },
    },
  },
  optimizeDeps: {
    include: ['@formily/antd', '@formily/core', '@formily/react'],
    exclude: ['@formily/antd/esm/radio/style.less']
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
}); 