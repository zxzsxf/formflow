import React from 'react'
import { Form as FormType, ObjectField, IFormFeedback } from '@formily/core'
import { useParentForm, FormProvider, JSXComponent } from '@formily/react'
import { FormLayout, IFormLayoutProps } from './form-layout/form-layout'

export interface FormProps extends IFormLayoutProps {
  form?: FormType
  component?: JSXComponent
  onAutoSubmit?: (values: any) => any
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
  previewTextPlaceholder?: React.ReactNode
}

// 将renderContent移到组件外部，避免在渲染过程中创建函数
const renderContent = (
  form: FormType | ObjectField,
  component: JSXComponent,
  props: any,
  onAutoSubmit?: (values: any) => any,
  onAutoSubmitFailed?: (feedbacks: IFormFeedback[]) => void
) => (
  <FormLayout shallow={false} {...props}>
    {React.createElement(
      // @ts-ignore
      component,
      {
        onSubmit(e: React.FormEvent) {
          e?.stopPropagation?.()
          e?.preventDefault?.()
          form.submit(onAutoSubmit).catch(onAutoSubmitFailed)
        },
      },
      props.children
    )}
  </FormLayout>
)

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  form,
  component = 'form',
  onAutoSubmit,
  onAutoSubmitFailed,
  ...props
}) => {
  const top = useParentForm()
  
  if (form) {
    return (
      <FormProvider form={form}>
        {renderContent(form, component, props, onAutoSubmit, onAutoSubmitFailed)}
      </FormProvider>
    )
  }
  
  if (!top) {
    throw new Error('must pass form instance by createForm')
  }
  
  return renderContent(top, component, props, onAutoSubmit, onAutoSubmitFailed)
}

export default Form
