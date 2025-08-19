import React from 'react';
import { createRoot } from 'react-dom/client';
import ExampleForm from './example';

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(ExampleForm));
  }
}); 