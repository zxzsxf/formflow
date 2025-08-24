import React, { useRef, useEffect, useMemo, useState } from "react";
import { createSchemaField } from "@formily/react";
import { createForm, onFormValuesChange } from "@formily/core";
import { toJS } from "@formily/reactive";
import { withErrorBoundary } from "react-error-boundary";

// import { mockSchema } from "../mockSchema";
// @ts-ignore
// import * as components from "../../../components/src/index";
import * as components from "@flowform/components/index"; // 工程组件


const SchemaField = createSchemaField({
// @ts-ignore
  components: { ...components },
});
const { Form } = components;

/**
 * 创建表单
 * @param formSchema EasyFrom 的 Schema
 * @returns 表单组件
 */
export const createFlowForm = <T extends {} = any>(
  formSchema?: any
): React.FC<any> => {
  return withErrorBoundary(
    function (props: any) {
      const { type = "edit", onDetail, value, onChange } = props;
      const emitRef = useRef<any>(null);
      const form = useMemo(() => {
        const f = createForm<T>({
          effects() {
            onFormValuesChange(() => {
              emitRef.current?.();
            });
          },
        });
        if (props.formRef) {
          props.formRef.current = f;
        }
        return f;
      }, []);
      useEffect(() => {
        emitRef.current = () => {
          if (onChange) {
            onChange(toJS(form.values));
          }
        };
      }, [onChange, form]);

      return (
        <div className="">
          <Form labelCol={6} wrapperCol={12} form={form}>
            <SchemaField schema={formSchema?.schemas || {}} />
            {props.children}
          </Form>
        </div>
      );
    },
    {
      fallback: <div style={{ color: "red" }}>表单渲染失败，请检查！</div>,
      onError(error: any, stack: any) {
        console.log(error, stack);
      },
    }
  );
};

export default createFlowForm;
