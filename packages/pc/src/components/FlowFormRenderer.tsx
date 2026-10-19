import React, { useEffect, useMemo, useRef } from "react";
import { createForm, onFormValuesChange } from "@formily/core";
import { createSchemaField, FormProvider, ISchema } from "@formily/react";
import { toJS } from "@formily/reactive";
import * as components from "flowform-component";

const SchemaField = createSchemaField({ components: {
  Input: components.Input,
  InputNumber: components.InputNumber,
  TextArea: components.TextArea,
  Select: components.Select,
  Checkbox: components.Checkbox,
  CheckboxGroup: components.CheckboxGroup,
  Radio: components.Radio,
  RadioGroup: components.RadioGroup,
  DatePicker: components.DatePicker,
  Switch: components.Switch,
  Upload: components.Upload,
  FormItem: components.FormItem,
} });
const { Form } = components;

export interface FlowFormRendererProps {
  schema: ISchema;
  initialValues?: Record<string, unknown>;
  onChange?: (values: Record<string, unknown>) => void;
  formRef?: React.MutableRefObject<any>;
  children?: React.ReactNode;
}

export const FlowFormRenderer: React.FC<FlowFormRendererProps> = ({ schema, initialValues, onChange, formRef, children }) => {
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);
  const form = useMemo(() => createForm({
    initialValues: initialValues || {},
    effects() {
      onFormValuesChange(current => onChangeRef.current?.(toJS(current.values)));
    },
  }), []);

  useEffect(() => {
    if (formRef) formRef.current = form;
    return () => { if (formRef && formRef.current === form) formRef.current = null; };
  }, [form, formRef]);

  return (
    <FormProvider form={form}>
      <Form labelCol={6} wrapperCol={12}>
        <SchemaField schema={schema} />
        {children}
      </Form>
    </FormProvider>
  );
};

export default FlowFormRenderer;
