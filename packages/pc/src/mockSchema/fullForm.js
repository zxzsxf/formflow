export const fullFormSchema = {
    schemas: {
        type: 'object',
        properties: {
            // 基础输入组件
            inputComponent: {
                name: 'inputComponent',
                title: '输入框组件',
                required: true,
                readOnly: false,
                type: 'string',
                'x-index': 0,
                'x-component': 'Input',
                'x-component-props': {
                    title: '基础输入框',
                    placeholder: '请输入内容',
                    allowClear: true,
                    showCount: true,
                    maxLength: 100,
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            inputNumberComponent: {
                name: 'inputNumberComponent',
                title: '数字输入框组件',
                required: false,
                readOnly: false,
                type: 'number',
                'x-index': 1,
                'x-component': 'InputNumber',
                'x-component-props': {
                    title: '数字输入框',
                    placeholder: '请输入数字',
                    min: 0,
                    max: 999999,
                    precision: 2,
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            textAreaComponent: {
                name: 'textAreaComponent',
                title: '文本域组件',
                required: false,
                readOnly: false,
                type: 'string',
                'x-index': 2,
                'x-component': 'TextArea',
                'x-component-props': {
                    title: '多行文本输入',
                    placeholder: '请输入多行文本',
                    rows: 4,
                    maxLength: 500,
                    showCount: true,
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            selectComponent: {
                name: 'selectComponent',
                title: '选择器组件',
                required: true,
                readOnly: false,
                type: 'string',
                'x-index': 3,
                'x-component': 'Select',
                'x-component-props': {
                    title: '下拉选择器',
                    placeholder: '请选择',
                    options: [
                        { label: '选项1', value: 'option1' },
                        { label: '选项2', value: 'option2' },
                        { label: '选项3', value: 'option3' },
                    ],
                    allowClear: true,
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            checkboxComponent: {
                name: 'checkboxComponent',
                title: '复选框组件',
                required: false,
                readOnly: false,
                type: 'boolean',
                'x-index': 4,
                'x-component': 'Checkbox',
                'x-component-props': {
                    title: '复选框',
                    children: '我同意相关条款',
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            checkboxGroupComponent: {
                name: 'checkboxGroupComponent',
                title: '复选框组组件',
                required: false,
                readOnly: false,
                type: 'array',
                'x-index': 5,
                'x-component': 'CheckboxGroup',
                'x-component-props': {
                    title: '复选框组',
                    options: [
                        { label: '选项A', value: 'A' },
                        { label: '选项B', value: 'B' },
                        { label: '选项C', value: 'C' },
                    ],
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            radioComponent: {
                name: 'radioComponent',
                title: '单选框组件',
                required: false,
                readOnly: false,
                type: 'string',
                'x-index': 6,
                'x-component': 'Radio',
                'x-component-props': {
                    title: '单选框',
                    children: '单选选项',
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            radioGroupComponent: {
                name: 'radioGroupComponent',
                title: '单选框组组件',
                required: true,
                readOnly: false,
                type: 'string',
                'x-index': 7,
                'x-component': 'RadioGroup',
                'x-component-props': {
                    title: '单选框组',
                    options: [
                        { label: '选项1', value: 'option1' },
                        { label: '选项2', value: 'option2' },
                        { label: '选项3', value: 'option3' },
                    ],
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            datePickerComponent: {
                name: 'datePickerComponent',
                title: '日期选择器组件',
                required: false,
                readOnly: false,
                type: 'string',
                'x-index': 8,
                'x-component': 'DatePicker',
                'x-component-props': {
                    title: '日期选择器',
                    placeholder: '请选择日期',
                    format: 'YYYY-MM-DD',
                    allowClear: true,
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            switchComponent: {
                name: 'switchComponent',
                title: '开关组件',
                required: false,
                readOnly: false,
                type: 'boolean',
                'x-index': 9,
                'x-component': 'Switch',
                'x-component-props': {
                    title: '开关',
                    checkedChildren: '开启',
                    unCheckedChildren: '关闭',
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            uploadComponent: {
                name: 'uploadComponent',
                title: '上传组件',
                required: false,
                readOnly: false,
                type: 'array',
                'x-index': 10,
                'x-component': 'Upload',
                'x-component-props': {
                    title: '文件上传',
                    placeholder: '点击或拖拽文件到此区域上传',
                    accept: '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx',
                    maxCount: 5,
                    multiple: true,
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            // 容器组件
            cardContainer: {
                name: 'cardContainer',
                title: '卡片容器',
                type: 'void',
                properties: {
                    cardContent: {
                        name: 'cardContent',
                        title: '卡片内容',
                        type: 'string',
                        'x-index': 0,
                        'x-component': 'Input',
                        'x-component-props': {
                            title: '卡片内的输入框',
                            placeholder: '请输入卡片内容',
                        },
                        'x-config': {
                            permission: {
                                editable: true,
                                selectable: true,
                                deletable: true,
                            },
                        },
                    },
                },
                'x-index': 11,
                'x-component': 'Card',
                'x-component-props': {
                    title: '卡片容器',
                    bordered: true,
                    hoverable: true,
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            // 调试组件
            fieldDebugComponent: {
                name: 'fieldDebugComponent',
                title: '字段调试组件',
                required: false,
                readOnly: false,
                type: 'void',
                'x-index': 12,
                'x-component': 'FieldDebug',
                'x-component-props': {
                    title: '字段调试信息',
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            // 预览文本组件
            previewTextComponent: {
                name: 'previewTextComponent',
                title: '预览文本组件',
                required: false,
                readOnly: false,
                type: 'string',
                'x-index': 13,
                'x-component': 'PreviewText',
                'x-component-props': {
                    title: '预览文本',
                    value: '这是预览文本内容',
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
        },
    }
}
