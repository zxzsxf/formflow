import React, { useRef } from 'react';
// import { createFlowForm } from '../../../../pc/src/hooks/create-form-flow';
import { createFlowForm } from '../../../../packages/pc/src/hooks/create-form-flow';

// 自定义组件示例 schema
const customComponentsSchema = {
  schemas: {
    type: "object",
    properties: [
      {
        name: "customComponents",
        title: "自定义组件示例",
        type: "void",
        properties: [
          {
            name: "fileUpload",
            title: "文件上传",
            type: "array",
            "x-component": "Upload",
            "x-component-props": {
              placeholder: "请选择要上传的文件",
              accept: ".jpg,.png,.pdf,.doc,.docx",
              maxSize: 10 * 1024 * 1024, // 10MB
              multiple: true
            }
          },
          {
            name: "richText",
            title: "富文本编辑器",
            type: "string",
            "x-component": "TextArea",
            "x-component-props": {
              placeholder: "请输入富文本内容...",
              rows: 6,
              style: {
                minHeight: '120px',
                border: '1px solid #d9d9d9',
                borderRadius: '6px',
                padding: '8px 12px'
              }
            }
          },
          {
            name: "colorPicker",
            title: "颜色选择器",
            type: "string",
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请选择颜色（如：#1890ff）",
              type: "color",
              style: {
                height: '40px',
                padding: '4px'
              }
            }
          },
          {
            name: "slider",
            title: "滑块选择",
            type: "number",
            "x-component": "InputNumber",
            "x-component-props": {
              placeholder: "请选择数值（0-100）",
              min: 0,
              max: 100,
              step: 5,
              style: {
                width: '100%'
              }
            }
          },
          {
            name: "tags",
            title: "标签输入",
            type: "array",
            "x-component": "Input",
            "x-component-props": {
              placeholder: "请输入标签，用逗号分隔",
              style: {
                width: '100%'
              }
            }
          },
          {
            name: "rating",
            title: "评分",
            type: "number",
            "x-component": "Select",
            "x-component-props": {
              placeholder: "请选择评分",
              options: [
                { label: "⭐ 1分", value: 1 },
                { label: "⭐⭐ 2分", value: 2 },
                { label: "⭐⭐⭐ 3分", value: 3 },
                { label: "⭐⭐⭐⭐ 4分", value: 4 },
                { label: "⭐⭐⭐⭐⭐ 5分", value: 5 }
              ]
            }
          },
          {
            name: "timeRange",
            title: "时间范围",
            type: "object",
            properties: {
              startTime: {
                name: "startTime",
                title: "开始时间",
                type: "string",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "开始时间",
                  type: "time"
                }
              },
              endTime: {
                name: "endTime",
                title: "结束时间",
                type: "string",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "结束时间",
                  type: "time"
                }
              }
            }
          },
          {
            name: "conditionalField",
            title: "条件显示字段",
            type: "void",
            properties: {
              showConditional: {
                name: "showConditional",
                title: "是否显示额外字段",
                type: "boolean",
                "x-component": "Switch",
                "x-component-props": {
                  checkedChildren: "显示",
                  unCheckedChildren: "隐藏"
                }
              },
              conditionalInput: {
                name: "conditionalInput",
                title: "额外输入字段",
                type: "string",
                "x-component": "Input",
                "x-component-props": {
                  placeholder: "这是一个条件显示的字段",
                  disabled: false
                },
                "x-reactions": {
                  dependencies: ["showConditional"],
                  fulfill: {
                    state: {
                      visible: "{{$deps[0]}}"
                    }
                  }
                }
              }
            }
          }
        ],
        "x-component": "Card"
      }
    ]
  }
};

const CustomComponentsExample = () => {
  const formRef = useRef<any>(null);
  const FlowFormDemo = createFlowForm(customComponentsSchema);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submit().then((values: any) => {
        console.log('自定义组件表单提交成功，数据:', values);
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

  const handleSetValues = () => {
    if (formRef.current) {
      const demoValues = {
        fileUpload: [],
        richText: '这是一个预设的富文本内容示例',
        colorPicker: '#1890ff',
        slider: 50,
        tags: ['React', 'FlowForm', '低代码'],
        rating: 5,
        timeRange: {
          startTime: '09:00',
          endTime: '18:00'
        },
        conditionalField: {
          showConditional: true,
          conditionalInput: '预设的条件字段内容'
        }
      };
      
      formRef.current.setValues(demoValues);
      console.log('已设置演示数据:', demoValues);
      alert('已设置演示数据，请查看表单');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">自定义组件示例</h2>
      <p className="form-description">
        这个示例展示了 FlowForm 的自定义组件能力。包含文件上传、富文本编辑、颜色选择、滑块、标签、评分、时间范围、条件显示等高级组件。
      </p>

      <div className="code-preview">
        <strong>自定义组件特性：</strong>
        <ul>
          <li><strong>文件上传：</strong>支持多文件、文件类型限制、大小限制</li>
          <li><strong>富文本编辑：</strong>大文本输入区域，支持多行编辑</li>
          <li><strong>颜色选择：</strong>原生颜色选择器</li>
          <li><strong>滑块选择：</strong>数值范围选择，支持步进</li>
          <li><strong>标签输入：</strong>支持多个标签的输入</li>
          <li><strong>评分组件：</strong>星级评分选择</li>
          <li><strong>时间范围：</strong>开始和结束时间选择</li>
          <li><strong>条件显示：</strong>根据开关状态显示/隐藏字段</li>
        </ul>
      </div>

      <FlowFormDemo 
        formRef={formRef}
        onChange={(values: any) => {
          console.log('自定义组件表单数据变化:', values);
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
        
        <button className="btn btn-outline" onClick={handleSetValues}>
          设置演示数据
        </button>
      </div>
      
      <div className="usage-guide">
        <h4>自定义组件说明：</h4>
        <ul>
          <li>文件上传组件支持拖拽和点击上传，有文件类型和大小限制</li>
          <li>富文本编辑器提供大文本输入区域，适合长文本内容</li>
          <li>颜色选择器使用原生HTML5颜色选择功能</li>
          <li>滑块组件支持数值范围选择和步进设置</li>
          <li>标签输入支持多个标签的批量输入</li>
          <li>评分组件使用星级显示，直观易用</li>
          <li>时间范围组件包含开始和结束时间选择</li>
          <li>条件显示字段根据开关状态动态显示或隐藏</li>
          <li>可以设置演示数据来快速体验各种组件</li>
        </ul>
      </div>
    </div>
  );
};

export default CustomComponentsExample;
