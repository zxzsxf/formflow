import React from "react";
import { ISchema } from "@formily/react";
import { withErrorBoundary } from "react-error-boundary";
import { FlowFormRenderer } from "../components/FlowFormRenderer";

/** Legacy factory accepting the existing `{ schemas }` envelope. */
export const createFlowForm = <T extends {} = any>(formSchema?: { schemas?: ISchema }): React.FC<any> => {
  const LegacyForm: React.FC<any> = ({ value, ...props }) => (
    <FlowFormRenderer {...props} initialValues={value} schema={formSchema?.schemas || {}} />
  );
  return withErrorBoundary(LegacyForm, {
    fallback: <div style={{ color: "red" }}>表单渲染失败，请检查！</div>,
  });
};

export default createFlowForm;
