import React, { useRef } from 'react';
import { createFlowForm } from '../../../../packages/pc/src/hooks/create-form-flow';

// 表单验证 schema
const validationFormSchema = {
  schemas: {
    type: "object",
    properties: [
      {
        name: "validationInfo",
        title: "验证规则示例",
        type: "void",
        properties: [
          {
            name: "username",
            title: "用户名",
            type: "string",
            required: true,
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入用户名（3-20个字符）",
              maxLength: 20
            },
            "x-validator": [
              {
                required: true,
                message: "用户名不能为空"
              },
              {
                min: 3,
                message: "用户名至少3个字符"
              },
              {
                pattern: /^[a-zA-Z0-9_]+$/,
                message: "用户名只能包含字母、数字和下划线"
              }
            ]
          },
          {
            name: "password",
            title: "密码",
            type: "string",
            required: true,
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入密码（8-20位，包含字母和数字）",
              type: "password",
              maxLength: 20
            },
            "x-validator": [
              {
                required: true,
                message: "密码不能为空"
              },
              {
                min: 8,
                message: "密码至少8位"
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                message: "密码必须包含字母和数字"
              }
            ]
          },
          {
            name: "confirmPassword",
            title: "确认密码",
            type: "string",
            required: true,
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请再次输入密码",
              type: "password"
            },
            "x-validator": [
              {
                required: true,
                message: "请确认密码"
              },
              {
                validator: (value: string, rule: any) => {
                  const password = rule.form?.values?.password;
                  if (value !== password) {
                    return Promise.reject('两次输入的密码不一致');
                  }
                  return Promise.resolve();
                }
              }
            ]
          },
          {
            name: "email",
            title: "邮箱",
            type: "string",
            required: true,
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入有效的邮箱地址",
              type: "email"
            },
            "x-validator": [
              {
                required: true,
                message: "邮箱不能为空"
              },
              {
                type: "email",
                message: "请输入有效的邮箱地址"
              }
            ]
          },
          {
            name: "phone",
            title: "手机号",
            type: "string",
            required: true,
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入11位手机号",
              type: "tel",
              maxLength: 11
            },
            "x-validator": [
              {
                required: true,
                message: "手机号不能为空"
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: "请输入有效的手机号"
              }
            ]
          },
          {
            name: "age",
            title: "年龄",
            type: "number",
            required: true,
            "x-component": "InputNumber",
            "x-component-props": {
              placeholder: "请输入年龄（18-65岁）",
              min: 18,
              max: 65
            },
            "x-validator": [
              {
                required: true,
                message: "年龄不能为空"
              },
              {
                min: 18,
                message: "年龄不能小于18岁"
              },
              {
                max: 65,
                message: "年龄不能大于65岁"
              }
            ]
          },
          {
            name: "website",
            title: "个人网站",
            type: "string",
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入网站地址（可选）",
              type: "url"
            },
            "x-validator": [
              {
                type: "url",
                message: "请输入有效的网站地址"
              }
            ]
          }
        ],
        "x-component": "Card"
      }
    ]
  }
};

const FormValidationExample = () => {
  const formRef = useRef<any>(null);
  const FlowFormDemo = createFlowForm(validationFormSchema);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit().then((values: any) => {
        console.log('验证表单提交成功，数据:', values);
        alert('表单验证通过，提交成功！请查看控制台输出');
      }).catch((errors: any) => {
        console.error('表单验证失败:', errors);
        alert('表单验证失败，请检查输入并修正错误');
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

  const handleValidate = () => {
    if (formRef.current) {
      formRef.current.validate().then(() => {
        alert('表单验证通过！');
      }).catch((errors: any) => {
        console.error('表单验证失败:', errors);
        alert('表单验证失败，请检查输入');
      });
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">表单验证示例</h2>
      <p className="form-description">
        这个示例展示了 FlowForm 强大的表单验证功能。包含各种验证规则：必填验证、长度验证、格式验证、自定义验证等。
      </p>

      <div className="code-preview">
        <strong>验证规则说明：</strong>
        <ul>
          <li><strong>用户名：</strong>必填，3-20字符，只能包含字母、数字、下划线</li>
          <li><strong>密码：</strong>必填，8-20位，必须包含字母和数字</li>
          <li><strong>确认密码：</strong>必填，必须与密码一致</li>
          <li><strong>邮箱：</strong>必填，必须符合邮箱格式</li>
          <li><strong>手机号：</strong>必填，必须符合11位手机号格式</li>
          <li><strong>年龄：</strong>必填，18-65岁之间</li>
          <li><strong>个人网站：</strong>可选，如果填写必须符合URL格式</li>
        </ul>
      </div>

      <FlowFormDemo 
        formRef={formRef}
        onChange={(values: any) => {
          console.log('验证表单数据变化:', values);
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
        
        <button className="btn btn-outline" onClick={handleValidate}>
          验证表单
        </button>
      </div>
      
      <div className="usage-guide">
        <h4>验证功能说明：</h4>
        <ul>
          <li>所有必填字段都有红色星号标识</li>
          <li>输入时实时验证，错误信息会显示在字段下方</li>
          <li>密码字段有强度要求，必须包含字母和数字</li>
          <li>确认密码会与密码字段进行一致性验证</li>
          <li>邮箱、手机号、网站地址都有格式验证</li>
          <li>年龄字段有数值范围限制</li>
          <li>可以单独验证表单而不提交</li>
        </ul>
      </div>
    </div>
  );
};

export default FormValidationExample;
