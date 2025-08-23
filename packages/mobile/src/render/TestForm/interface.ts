export interface TestFormProps {
    /**
     * 动态表单Schema
     */
    dynamicSchema?: object;
    /**
     * 表单模版id
     */
    formTemplateId?: string;
    /**
     * 表单标题
     */
    title?: string;
    /**
     * 表单实例数据
     */
    formInstanceData?: any;
    /**
     * 表单change回调
     */
    onChange?: (value: any) => void;
    /**
     * 表单状态
     */
    editStatus?: number;
    /**
     * 报备单号
     */
    reportNo?: string;
    /**
     * 表单逻辑编排事件
     */
    fieldMountEventObj?: any;
    /**
     * 生命周期回调
     */
    onFieldMount?:() => void;
    onFieldChange?:() => void;
    onMount?:() => void;
    onUnmount?:() => void;
    onInputChange?:() => void;
    onValidate?:() => void;
}
