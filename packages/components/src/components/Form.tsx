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

export const Form: React.FC<React.PropsWithChildren<FormProps>> = ({
  form,
  component = 'form', // 使用默认参数替代 defaultProps
  onAutoSubmit,
  onAutoSubmitFailed,
  ...props
}) => {
  const top = useParentForm()
  const renderContent = (form: FormType | ObjectField) => (
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
  if (form)
    return <FormProvider form={form}>{renderContent(form)}</FormProvider>
  if (!top) throw new Error('must pass form instance by createForm')
  return renderContent(top)
}



export default Form
