import React, { createContext, useEffect, useState, useRef } from "react";
import constate from 'constate';

interface FormContextValue {
   /**
   * React插槽，用于渲染自定义插槽
   */
   slots?: Record<string, React.FC>;
}

const FormBaseContext = createContext<FormContextValue>({});

function FormContext() {
   const [loadError, setLoadError] = useState<{
      visible: boolean;
      msg?: string;
   }>({visible: false})
//    // 微件表单项渲染结果
//    const [microComponentsRenderRes, setMicroComponentsRenderRes] = useState('{}');
//    // 微件表单项是否全部加载完成
//    const [isAllMicroComponentsRender, setIsAllMicroComponentsRender] = useState<boolean|string>('');
   // 全部表单项与微件名的映射map
   const fieldMicroComponentNameMapRef = useRef({});
   // 全部表单项mount后的回调函数map
   const fieldMountFuncsRef = useRef({});




   return {
    //   microComponentsRenderRes,
    //   updateMicroComponentsRenderRes,
    //   isAllMicroComponentsRender,
      fieldMicroComponentNameMapRef,
      fieldMountFuncsRef,
      loadError,
      setLoadError,
   }
}
const [FormContextProvider, useFormContext] = constate(FormContext)

export { FormBaseContext, FormContextProvider, useFormContext };