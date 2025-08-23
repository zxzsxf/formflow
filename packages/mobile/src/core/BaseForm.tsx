// @ts-nocheck
import * as React from 'react';
import { useEffect, useImperativeHandle, useMemo, useRef, forwardRef } from 'react';
import { FormLayout } from '@formily/antd';
import { createForm, Form } from '@formily/core';
import { FormProvider } from '@formily/react';
import { registerSchemaField } from '../reaction/schemaRegister';
import componentsDataDefault from '../reaction/componentRegister'; // 表单物料注册
import { schemas } from '../mock/initSchema'; // mock数据

let SchemaField = null;

interface FormProxy {
  form: Form;
  submit: () => Promise<boolean>;
  validate: () => Promise<boolean>;
  initValidate: (isReturnErrorInfos?: boolean) => Promise<boolean | { validateRes: boolean; errors?: any }>;
}

interface BaseFormProps {
  componentsData?: any;
  onValidate?: (form: Form) => void;
  formSchema?: any;
  formState?: number;
}

const BaseForm = forwardRef<FormProxy, BaseFormProps>((props, ref) => {
  const {
    componentsData,
    onValidate,
    formSchema,
    formState
  } = props;
  const [componentsLoaded, setComponentsLoaded] = React.useState(false);
  const [formSchemas, setFormSchemas] = React.useState<Object>({});
  const form: Form = useMemo(
    () =>
      createForm({
        values: {},
      }),
    []
  );

  useEffect(() => {
    SchemaField = registerSchemaField(componentsData || componentsDataDefault)
    TransformSchema();
    setComponentsLoaded(true);
    // @ts-ignore
  }, [formSchema]);

  // 转换 schema，schema 多状态等处理逻辑
  const TransformSchema = async () => {
    try {
      if (formSchema) {
        let newFormSchema = formSchema;
        if(formState && typeof formState === 'object' && Object.keys(formState).length > 0) {
          // 表单多状态渲染，待补充
          // newFormSchema = transformSchemaByStatus(newFormSchema, editStatus, formData, schemaMapping.biz2FormMap, formState);
        }
        setFormSchemas(newFormSchema);
        onValidate && onValidate(formProxy());
      }
    } catch (error) {
      console.error('TransformSchema error', error);
    }
    // mock 数据
    // setFormSchemas(schemas);
  }

  // vue调用时提供外部调用, 可作为复用对象
  const formProxy = () => {
    return {
      form,
      // getLogicEngine: () => logicEngineRef.current,
      submit: async () => {
        try {
          await form.submit();
          return true;
        } catch (e) {
          console.log('validate', e)
          return false;
        }
      },
      validate: async () => {
        try {
          isInit.current = false;
          await form.validate();
          return true;
        } catch (e) {
          console.log('validate', e)
          return false;
        }
      },
      initValidate: async (isReturnErrorInfos = false) => {
        try {
          isInit.current = true
          await form.validate();
          if (isReturnErrorInfos) {
            return {
              validateRes: true,
            }
          }
          return true;
        } catch (e) {
          if (isReturnErrorInfos) {
            return {
              validateRes: false,
              errors: e,
            }
          }
          console.log('validate', e)
          return false;
        }
      },
      // initLogic: (tempFormSchema) => {
      //   let logicalArrangement = tempFormSchema;
      //   if (typeof tempFormSchema === 'string') {
      //     logicalArrangement = JSON.parse(tempFormSchema);
      //   }
      //   const engine = LpmEngine.createByJSON(logicalArrangement);
      //   logicEngineRef.current = engine;
      //   return engine
      // }
    }
  }

  // react调用时提供外部调用
  useImperativeHandle(ref, () => {
    return formProxy();
  })

  if(!componentsLoaded) return (<div>loading...</div>);
  return (
    <FormProvider form={form}>
      <FormLayout labelCol={6}>
        <SchemaField schema={formSchemas} />
      </FormLayout>
    </FormProvider>

  );
})

export default BaseForm;
