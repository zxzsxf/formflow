import React, { useState } from 'react';
import { createForm } from '@formily/core';
import { FormProvider, useField, observer } from '@formily/react';

// 创建表单实例
const form = createForm({
  initialValues: {
    name: '初始值'
  }
});

// ❌ 没有observer的组件 - 不会响应字段值变化
const NonObserverComponent = () => {
  const field = useField<any>();
  const [renderCount, setRenderCount] = useState(0);
  
  // 每次渲染时增加计数
  setRenderCount(prev => prev + 1);

  return (
    <div style={{ padding: 16, border: '2px solid #ff4d4f', borderRadius: 8, margin: 8 }}>
      <h4>❌ 没有observer的组件</h4>
      <p>渲染次数: {renderCount}</p>
      <p>字段值: {field?.value || 'undefined'}</p>
      <p style={{ color: '#ff4d4f' }}>
        注意：即使字段值变化，这个组件也不会重新渲染！
      </p>
    </div>
  );
};

// ✅ 有observer的组件 - 会响应字段值变化
const ObserverComponent = observer(() => {
  const field = useField<any>();
  const [renderCount, setRenderCount] = useState(0);
  
  // 每次渲染时增加计数
  setRenderCount(prev => prev + 1);

  return (
    <div style={{ padding: 16, border: '2px solid #52c41a', borderRadius: 8, margin: 8 }}>
      <h4>✅ 有observer的组件</h4>
      <p>渲染次数: {renderCount}</p>
      <p>字段值: {field?.value || 'undefined'}</p>
      <p style={{ color: '#52c41a' }}>
        字段值变化时，这个组件会自动重新渲染！
      </p>
    </div>
  );
});

// 普通React组件 - 依赖props变化
const NormalReactComponent = ({ value }: { value: string }) => {
  const [renderCount, setRenderCount] = useState(0);
  
  // 每次渲染时增加计数
  setRenderCount(prev => prev + 1);

  return (
    <div style={{ padding: 16, border: '2px solid #1890ff', borderRadius: 8, margin: 8 }}>
      <h4>🔵 普通React组件</h4>
      <p>渲染次数: {renderCount}</p>
      <p>Props值: {value}</p>
      <p style={{ color: '#1890ff' }}>
        只有props变化时，这个组件才会重新渲染！
      </p>
    </div>
  );
};

const ObserverDemo = () => {
  const [normalValue, setNormalValue] = useState('普通组件的值');
  const [updateCount, setUpdateCount] = useState(0);

  // 更新表单字段值
  const updateFormValue = () => {
    const newValue = `更新后的值 ${Date.now()}`;
    form.setValues({ name: newValue });
    setUpdateCount(prev => prev + 1);
    console.log('表单字段值已更新:', newValue);
  };

  // 更新普通组件的props
  const updateNormalValue = () => {
    const newValue = `普通组件新值 ${Date.now()}`;
    setNormalValue(newValue);
    setUpdateCount(prev => prev + 1);
    console.log('普通组件props已更新:', newValue);
  };

  return (
    <FormProvider form={form}>
      <div style={{ padding: 20 }}>
        <h2>Formily Observer 机制演示</h2>
        
        <div style={{ marginBottom: 20 }}>
          <p>更新次数: {updateCount}</p>
          <button 
            onClick={updateFormValue}
            style={{ 
              padding: '8px 16px', 
              background: '#52c41a', 
              color: 'white', 
              border: 'none', 
              borderRadius: 4,
              marginRight: 8
            }}
          >
            更新表单字段值
          </button>
          <button 
            onClick={updateNormalValue}
            style={{ 
              padding: '8px 16px', 
              background: '#1890ff', 
              color: 'white', 
              border: 'none', 
              borderRadius: 4
            }}
          >
            更新普通组件props
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <NonObserverComponent />
          <ObserverComponent />
        </div>
        
        <div style={{ marginTop: 16 }}>
          <NormalReactComponent value={normalValue} />
        </div>

        <div style={{ marginTop: 20, padding: 16, background: '#f0f0f0', borderRadius: 8 }}>
          <h3>🔍 观察结果说明</h3>
          <ul>
            <li><strong>没有observer的组件</strong>: 字段值变化时不会重新渲染，渲染次数不变</li>
            <li><strong>有observer的组件</strong>: 字段值变化时会自动重新渲染，渲染次数增加</li>
            <li><strong>普通React组件</strong>: 只有props变化时才会重新渲染</li>
          </ul>
          
          <h4>💡 关键理解</h4>
          <p>
            Formily的字段值变化<strong>不会</strong>改变组件的props，所以需要observer来订阅字段变化。
            这是Formily响应式系统的核心机制，与React的props驱动渲染机制不同。
          </p>
        </div>
      </div>
    </FormProvider>
  );
};

export default ObserverDemo; 