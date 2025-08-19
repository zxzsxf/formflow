import React, { useRef } from 'react';
import { createFormFlow } from '../../../pc/src/hooks/create-form-flow';

// 定义表单的 schema
const formSchema = {
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
        "x-component": "Card",
        // "x-decorator": "ItemDecorator"
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
        "x-component": "Card",
        // "x-decorator": "ItemDecorator"
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
        "x-component": "Card",
        // "x-decorator": "ItemDecorator"
      }
    ]
  }
};

const FlowFormDemo = createFormFlow({});

const ExampleForm = () => {
  const formRef = useRef<any>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit().then((values: any) => {
        console.log('表单提交成功，数据:', values);
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      <FlowFormDemo 
        formRef={formRef}
        onChange={(values: any) => {
          console.log('表单数据变化:', values);
        }}
      />
      
      <div style={{ 
        marginTop: '20px', 
        textAlign: 'center',
        display: 'flex',
        gap: '10px',
        justifyContent: 'center'
      }}>
        <button 
          onClick={handleSubmit}
          style={{
            padding: '10px 20px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          提交表单
        </button>
        
        <button 
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#faad14',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          重置表单
        </button>
        
        <button 
          onClick={handleGetValues}
          style={{
            padding: '10px 20px',
            backgroundColor: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          获取数据
        </button>
      </div>
      
      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#f5f5f5', 
        borderRadius: '4px',
        fontSize: '14px',
        color: '#666'
      }}>
        <h4>使用说明：</h4>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>填写表单信息，所有字段都有相应的验证规则</li>
          <li>点击"提交表单"按钮提交数据</li>
          <li>点击"重置表单"按钮清空所有输入</li>
          <li>点击"获取数据"按钮查看当前表单数据</li>
          <li>表单数据变化会实时输出到控制台</li>
        </ul>
      </div>
    </div>
  );
};

export default ExampleForm; 