import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  interface JSX {
    IntrinsicElements: any;
  }
}

declare module '@formily/react' {
  interface Field {
    value: any;
    onInput: (value: any) => void;
    onBlur: () => void;
    onFocus: () => void;
  }
}

declare module '@formily/core' {
  interface Field {
    value: any;
    onInput: (value: any) => void;
    onBlur: () => void;
    onFocus: () => void;
  }
}

// 全局类型声明
declare global {
  interface Window {
    __FORMILY_DEVTOOLS_GLOBAL_HOOK__: any;
  }
} 