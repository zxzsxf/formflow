// @ts-nocheck
import React from 'react';
import { Form, FormItem, Input, InputNumber, TextArea, Select, Checkbox, CheckboxGroup, Radio, RadioGroup, DatePicker, Switch, Upload, FieldDebug } from '../index';
import { createForm } from '@formily/core';
import { FormProvider } from '@formily/react';

const form = createForm({
  initialValues: {
    name: '',
    age: '',
    description: '',
    gender: '',
    hobbies: [],
    profession: '',
    birthDate: null,
    isEmployed: false,
    avatar: []
  }
});

const ExampleForm = () => {
  const handleSubmit = (values: any) => {
    console.log('Form submitted with values:', values);
  };

  const handleSubmitFailed = (feedbacks: any[]) => {
    console.error('Form submission failed:', feedbacks);
  };

  return (
    // <FormProvider form={form}>
    //   <Form onAutoSubmit={handleSubmit} onAutoSubmitFailed={handleSubmitFailed}>
    //     <h2>FormFlow 组件示例</h2>
        
    //     {/* 基础输入组件 */}
    //     <FormItem label="姓名" name="name" required>
    //       <Input placeholder="请输入姓名" />
    //       <FieldDebug name="name" />
    //     </FormItem>
        
    //     <FormItem label="年龄" name="age" required>
    //       <InputNumber 
    //         placeholder="请输入年龄" 
    //         min={1} 
    //         max={120} 
    //         style={{ width: '100%' }}
    //       />
    //       <FieldDebug name="age" />
    //     </FormItem>
        
    //     <FormItem label="个人简介" name="description">
    //       <TextArea 
    //         placeholder="请输入个人简介" 
    //         rows={4}
    //         showCount
    //         maxLength={200}
    //       />
    //       <FieldDebug name="description" />
    //     </FormItem>
        
    //     {/* 选择组件 */}
    //     <FormItem label="性别" name="gender" required>
    //       <RadioGroup
    //         options={[
    //           { value: 'male', label: '男' },
    //           { value: 'female', label: '女' }
    //         ]}
    //       />
    //       <FieldDebug name="gender" />
    //     </FormItem>
        
    //     <FormItem label="兴趣爱好" name="hobbies">
    //       <CheckboxGroup
    //         options={[
    //           { value: 'reading', label: '阅读' },
    //           { value: 'music', label: '音乐' },
    //           { value: 'sports', label: '运动' },
    //           { value: 'travel', label: '旅行' }
    //         ]}
    //       />
    //       <FieldDebug name="hobbies" />
    //     </FormItem>
        
    //     <FormItem label="职业" name="profession" required>
    //       <Select
    //         placeholder="请选择职业"
    //         options={[
    //           { value: 'developer', label: '开发工程师' },
    //           { value: 'designer', label: '设计师' },
    //           { value: 'manager', label: '产品经理' },
    //           { value: 'other', label: '其他' }
    //         ]}
    //         style={{ width: '100%' }}
    //       />
    //       <FieldDebug name="profession" />
    //     </FormItem>
        
    //     {/* 其他组件 */}
    //     <FormItem label="出生日期" name="birthDate">
    //       <DatePicker 
    //         placeholder="请选择出生日期"
    //         style={{ width: '100%' }}
    //       />
    //       <FieldDebug name="birthDate" />
    //     </FormItem>
        
    //     <FormItem label="是否在职" name="isEmployed">
    //       <Switch />
    //       <FieldDebug name="isEmployed" />
    //     </FormItem>
        
    //     <FormItem label="头像上传" name="avatar">
    //       <Upload
    //         accept="image/*"
    //         maxCount={1}
    //         listType="picture-card"
    //       />
    //       <FieldDebug name="avatar" />
    //     </FormItem>
        
    //     {/* 表单操作 */}
    //     <FormItem>
    //       <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
    //         <button type="submit" style={{ padding: '8px 24px', background: '#1890ff', color: 'white', border: 'none', borderRadius: 4 }}>
    //           提交
    //         </button>
    //         <button type="button" onClick={() => form.reset()} style={{ padding: '8px 24px', background: '#f5f5f5', color: '#666', border: '1px solid #d9d9d9', borderRadius: 4 }}>
    //           重置
    //         </button>
    //       </div>
    //     </FormItem>
    //   </Form>
    // </FormProvider>
    <FormProvider form={form}>
    <Form onAutoSubmit={handleSubmit} onAutoSubmitFailed={handleSubmitFailed}>
      <h2>FormFlow 组件示例</h2>
      <FormItem label="姓名" name="name" required>
          <Input placeholder="请输入姓名" />
          {/* <FieldDebug name="name" /> */}
         </FormItem>
    
    </Form>
  </FormProvider>
  );
};

export default ExampleForm; 