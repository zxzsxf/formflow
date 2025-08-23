import React, { useRef } from 'react';
import { createFormFlow } from '../../../../packages/pc/src/hooks/create-form-flow';

// 基础表单 schema
const basicFormSchema = {
  schemas: {
    type: "object",
    properties: [
      {
        name: "basicInfo",
        title: "基本信息",
        type: "void",
        properties: [
          {
            name: "name",
            title: "姓名",
            type: "string",
            required: true,
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入姓名",
              maxLength: 20
            }
          },
          {
            name: "age",
            title: "年龄",
            type: "number",
            "x-component": "InputNumber",
            "x-component-props": {
              placeholder: "请输入年龄",
              min: 1,
              max: 120
            }
          },
          {
            name: "gender",
            title: "性别",
            type: "string",
            "x-component": "RadioGroup",
            "x-component-props": {
              options: [
                { label: "男", value: "male" },
                { label: "女", value: "female" }
              ]
            }
          }
        ],
        "x-component": "Card"
      }
    ]
  }
};

const BasicFormExample = () => {
  const formRef = useRef<any>(null);
  const FlowFormDemo = createFormFlow(basicFormSchema);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit().then((values: any) => {
        console.log('基础表单提交成功，数据:', values);
        alert('表单提交成功！请查看控制台输出');
      }).catch((errors: any) => {
        console.error('表单验证失败:', errors);
        alert('表单验证失败，请检查输入');
      });
    }
  };

  const handleReset = () => {
    if (formRef.current) {
      formRef.current.reset();
      console.log('表单已重置');
    }
  };

  const handleGetValues = () => {
    if (formRef.current) {
      const values = formRef.current.values;
      console.log('当前表单数据:', values);
      alert('当前表单数据已输出到控制台');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">基础表单示例</h2>
      <p className="form-description">
        这是一个基础的表单示例，展示了 FormFlow 的基本用法。包含输入框、数字输入框和单选按钮等基础组件。
      </p>

      <div className="code-preview">
        <strong>Schema 配置：</strong>
        <pre>{JSON.stringify(basicFormSchema, null, 2)}</pre>
      </div>

      <FlowFormDemo 
        formRef={formRef}
        onChange={(values: any) => {
          console.log('基础表单数据变化:', values);
        }}
      />
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleSubmit}>
          提交表单
        </button>
        
        <button className="btn btn-secondary" onClick={handleReset}>
          重置表单
        </button>
        
        <button className="btn btn-success" onClick={handleGetValues}>
          获取数据
        </button>
      </div>
      
      <div className="usage-guide">
        <h4>使用说明：</h4>
        <ul>
          <li>填写姓名、年龄和选择性别</li>
          <li>姓名字段为必填项，有长度限制</li>
          <li>年龄字段有数值范围限制（1-120）</li>
          <li>性别字段为单选按钮组</li>
          <li>点击按钮查看表单操作效果</li>
        </ul>
      </div>
    </div>
  );
};

export default BasicFormExample;
