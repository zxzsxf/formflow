import * as React from 'react';
import { connect } from '../utils/proxy';
import { createSchemaField } from "@formily/react";
import { JSXComponent } from '@formily/core';
// import { useFormContext } from '../FormMobileUI/utils/formContext';
// import { ReactMicroComponent } from '@wmfe/sqt-micro-component';

function DyncComponent(name: string) {
  function getMicroComponent(props: any):JSXComponent {
    return (
      <div>
        <div className="micro-wrapper">
          {/* <ReactMicroComponent
            name={name}
            componentProps={{ ...props }}
          /> */}
          micro-component: {name}
        </div>
        <div>
          props: { props && props?.xFieldName }
        </div>
      </div>
    );
  }
  return getMicroComponent
}

function generateComponent (name: string) {
    const microComponent = DyncComponent(name)
    const isImg = ['attachment-upload'].includes(name)
    // 针对图片组件的阅读态封装
    if (isImg) {
      return connect(
        microComponent,
        {
          type: 'img'
        }
      );
    }
    return connect(
      microComponent,
    );
}

export const registerSchemaField = (componentMaps: any) => {
    try {
      // 循环加载微件
      const microComponents = Object.keys(componentMaps).reduce((acc: any, key: string) => {
        acc[key] = typeof componentMaps[key] === 'string' ? generateComponent(componentMaps[key]) : componentMaps[key];
        return acc;
      }, {});
      
      const SchemaField = createSchemaField({
        components: {
          // 源码组件
          ...componentMaps,
          // 微件
          ...microComponents,
        }
      })
      return SchemaField;
    } catch (error) {
      console.error('registerSchemaField方法处理报错: ',error);
    }
  }