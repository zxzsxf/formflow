import React, { forwardRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { createForm, Form } from '@formily/core';
import { createSchemaField, FormProvider } from '@formily/react';
import { FormItem, Input as FormilyInput } from '@formily/antd';

export interface MobileFormHandle {
  form: Form;
  validate: () => Promise<boolean>;
  submit: () => Promise<Record<string, unknown>>;
  getValues: () => Record<string, unknown>;
}

export interface MobileFormProps {
  schema?: any;
  formSchema?: any;
  componentsData?: Record<string, React.ComponentType<any>>;
  initialValues?: Record<string, unknown>;
  readOnly?: boolean;
  onSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
}

const LocalCard: React.FC<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => (
  <section className="flowform-mobile-card">
    {title && <h3>{title}</h3>}
    {children}
  </section>
);

const BaseForm = forwardRef<MobileFormHandle, MobileFormProps>(({
  schema,
  formSchema,
  componentsData,
  initialValues,
  readOnly,
  onSubmit,
}, ref) => {
  const form = useMemo(() => createForm({ values: initialValues || {} }), []);
  const SchemaField = useMemo(
    () => createSchemaField({
      components: {
        FormItem,
        Input: FormilyInput,
        Card: LocalCard,
        ...componentsData,
      },
    }),
    [componentsData],
  );

  useEffect(() => {
    if (initialValues) {
      form.setValues(initialValues);
    }
  }, [form, initialValues]);

  useEffect(() => {
    form.setState(state => {
      state.editable = !readOnly;
    });
  }, [form, readOnly]);

  useImperativeHandle(ref, () => ({
    form,
    validate: async () => {
      try {
        await form.validate();
        return true;
      } catch {
        return false;
      }
    },
    submit: async () => {
      const values = await form.submit() as Record<string, unknown>;
      await onSubmit?.(values);
      return values;
    },
    getValues: () => form.values as Record<string, unknown>,
  }), [form, onSubmit]);

  const activeSchema = schema || formSchema;

  if (!activeSchema) {
    return <div role="alert">表单 schema 缺失</div>;
  }

  return (
    <FormProvider form={form}>
      <div className="flowform-mobile">
        <SchemaField schema={activeSchema} />
      </div>
    </FormProvider>
  );
});

export default BaseForm;
