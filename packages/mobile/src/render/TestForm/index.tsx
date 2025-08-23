import React, { useEffect, useImperativeHandle, useRef, useMemo, useState } from 'react';

import { FormPath } from '@formily/core';

import { useFormContext, FormContextProvider } from '../../context/formContext';
// import { getFormSchema,formFieldMount, getApplyDetailByApplyIdFn, getBaseInfo, handleAssociatedApprovalSchema, handleSchema, ReportSceneType } from '../../reaction/handleSchema';
import { getFormSchema, handleNotice, handleCard } from '../../reaction/handleSchema';

import { TestFormProps } from './interface';
import BaseForm from '../../core/BaseForm';
import { schemas } from '../../mock/initSchema'; // mock数据


const TestForm = React.forwardRef((props: TestFormProps, ref) => {
    const {
        dynamicSchema,
        formTemplateId,
        editStatus,
        formInstanceData,
        onChange,
        onValidate,
        onFieldMount,
        onFieldChange,
        onMount,
    } = props;
    const [formSchemas, setFormSchemas] = useState({});
    const [isShowEmpty, setIsShowEmpty] = useState(false);
    const [isShowError, setIsShowError] = useState(false);
    const [isFormSuccess, setIsFormSuccess] = useState<boolean>(false); // 表单填写状态
    const lpmId = useRef(null); // 逻辑编排Id缓存
    const preNeedUpdateUserSelectObjRef = useRef({}); // 使用ref记录旧的需要更新的数组

    const checkSchema = (schema?: object) => {
        if(schema && typeof schema === 'object' && Object.keys(schema).length) {
            return true;
        }
        return false;
    }

    // 初始化表单Schema
    const initFormSchema = async (schemaRes: any) => {
        if(checkSchema(dynamicSchema)) {
            // @ts-ignore
            setFormSchemas(dynamicSchema);
        } else if(checkSchema(schemaRes.schemas)) {
            const schema = JSON.parse(JSON.stringify(schemaRes.schemas));
            // 组件schema处理：1. 初始值赋值 2.组件默认配置注入 3.组件配置聚合
            handleNotice(schema);
            handleCard(schema);
            setFormSchemas(schema);
        } else {
            setIsShowError(true);
            setIsShowEmpty(true);
            setIsFormSuccess(true);
            setFormSchemas({});
        }
    }

    // 初始化表单
    const initForm = async () => {
        if(!formTemplateId) {
            setIsShowEmpty(true);
            setIsFormSuccess(true);
            return;
        }
        try {
            // const {schemaRes, isSuccess, error} = await getFormSchema({formTemplateId, editStatus})
            // mock数据
            const isSuccess = true;
            const schemaRes = {
                schemas: schemas
            };
            if(!isSuccess) {
                setIsShowError(true);
            }
            if ((!schemaRes || (typeof schemaRes?.schemas.properties === 'object' && !Object.keys(schemaRes?.schemas.properties).length))) {
                setIsShowEmpty(true);
                setIsFormSuccess(true);
                return;
            }
            await initFormSchema(schemaRes);
        } catch (error) {
            console.error('获取表单Schema失败', error);
        }
    }
    useEffect(() => {
      initForm();
    }, [formTemplateId])

    return (
        <div>
            <BaseForm formSchema={formSchemas} />
        </div>
    )
  });
  
  
  const TestFormRefComp = React.forwardRef((props: TestFormProps, ref) => {
    return (
      <FormContextProvider>
        <TestForm ref={ref} {...props} />
      </FormContextProvider>
    )
  })
  
  export default TestFormRefComp;
