import React, { useRef } from 'react';
import { createFormFlow } from '../../../../packages/pc/src/hooks/create-form-flow';

// 复杂表单 schema
const complexFormSchema = {
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
          },
          {
            name: "birthDate",
            title: "出生日期",
            type: "string",
            "x-component": "DatePicker",
            "x-component-props": {
              placeholder: "请选择出生日期"
            }
          }
        ],
        "x-component": "Card"
      },
      {
        name: "contactInfo",
        title: "联系信息",
        type: "void",
        properties: [
          {
            name: "email",
            title: "邮箱",
            type: "string",
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入邮箱地址",
              type: "email"
            }
          },
          {
            name: "phone",
            title: "手机号",
            type: "string",
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入手机号",
              type: "tel"
            }
          },
          {
            name: "address",
            title: "地址",
            type: "string",
            "x-component": "TextArea",
            "x-component-props": {
              placeholder: "请输入详细地址",
              rows: 3
            }
          }
        ],
        "x-component": "Card"
      },
      {
        name: "preferences",
        title: "个人偏好",
        type: "void",
        properties: [
          {
            name: "hobbies",
            title: "兴趣爱好",
            type: "array",
            "x-component": "CheckboxGroup",
            "x-component-props": {
              options: [
                { label: "阅读", value: "reading" },
                { label: "音乐", value: "music" },
                { label: "运动", value: "sports" },
                { label: "旅行", value: "travel" },
                { label: "美食", value: "food" }
              ]
            }
          },
          {
            name: "profession",
            title: "职业",
            type: "string",
            "x-component": "Select",
            "x-component-props": {
              placeholder: "请选择职业",
              options: [
                { label: "工程师", value: "engineer" },
                { label: "设计师", value: "designer" },
                { label: "产品经理", value: "pm" },
                { label: "运营", value: "operation" },
                { label: "其他", value: "other" }
              ]
            }
          },
          {
            name: "isEmployed",
            title: "是否在职",
            type: "boolean",
            "x-component": "Switch",
            "x-component-props": {
              checkedChildren: "在职",
              unCheckedChildren: "离职"
            }
          }
        ],
        "x-component": "Card"
      }
    ]
  }
};

const ComplexFormExample = () => {
  const formRef = useRef<any>(null);
  const FlowFormDemo = createFormFlow(complexFormSchema);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit().then((values: any) => {
        console.log('复杂表单提交成功，数据:', values);
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

  const handleClearValidation = () => {
    if (formRef.current) {
      formRef.current.clearErrors();
      console.log('表单验证错误已清除');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">复杂表单示例</h2>
      <p className="form-description">
        这是一个复杂的表单示例，展示了 FormFlow 的多种组件类型和布局能力。包含三个卡片分组，涵盖了各种常用的表单组件。
      </p>

      <div className="code-preview">
        <strong>Schema 配置：</strong>
        <pre>{JSON.stringify(complexFormSchema, null, 2)}</pre>
      </div>

      <FlowFormDemo 
        formRef={formRef}
        onChange={(values: any) => {
          console.log('复杂表单数据变化:', values);
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
        
        <button className="btn btn-outline" onClick={handleClearValidation}>
          清除验证
        </button>
      </div>
      
      <div className="usage-guide">
        <h4>使用说明：</h4>
        <ul>
          <li>表单分为三个卡片：基本信息、联系信息、个人偏好</li>
          <li>包含输入框、数字输入框、单选按钮、日期选择器、邮箱输入、手机号输入、文本域、复选框组、下拉选择、开关等组件</li>
          <li>每个卡片都有清晰的标题和分组</li>
          <li>支持表单验证、重置、数据获取等操作</li>
          <li>可以清除表单验证错误</li>
        </ul>
      </div>
    </div>
  );
};

export default ComplexFormExample;
