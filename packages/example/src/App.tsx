import React, { useState } from 'react';
import './App.css';
import './styles/global.less';
import BasicFormExample from './examples/BasicFormExample';
import ComplexFormExample from './examples/ComplexFormExample';
import FormValidationExample from './examples/FormValidationExample';
import CustomComponentsExample from './examples/CustomComponentsExample';
import BasicComponentForm from './playground/component/BasicComponentForm';
import BasicFormLayout from './playground/pc/BasicFormLayout';
import BasicMobileForm from './playground/mobile/BasicMobileForm';
function App() {
  const [activeExample, setActiveExample] = useState('');

  const examples = [
    { id: 'mobile', name: '基础mobile表单', component: BasicMobileForm },
    { id: 'layout', name: '基础表单布局', component: BasicFormLayout },
    { id: 'basic', name: '基础组件表单demo', component: BasicComponentForm },
    // { id: 'basic', name: '基础表单', component: BasicFormExample },
    // { id: 'complex', name: '复杂表单', component: ComplexFormExample },
    // { id: 'validation', name: '表单验证', component: FormValidationExample },
    // { id: 'custom', name: '自定义组件', component: CustomComponentsExample },
  ];

  const ActiveComponent = examples.find(ex => ex.id === activeExample)?.component || BasicMobileForm;

  return (
    <div className="App">
      <header className="App-header">
        <h2>FlowForm Playground</h2>
        {/* <p>FlowForm 组件库的交互式演示平台</p> */}
      </header>
      
      <nav className="example-nav">
        {examples.map(example => (
          <button
            key={example.id}
            className={`nav-button ${activeExample === example.id ? 'active' : ''}`}
            onClick={() => setActiveExample(example.id)}
          >
            {example.name}
          </button>
        ))}
      </nav>

      <main className="example-content">
        <ActiveComponent />
      </main>

      {/* <footer className="App-footer">
        <p>FlowForm - 低代码表单解决方案</p>
      </footer> */}
    </div>
  );
}

export default App; 