export const mockSchema = {
    schemas: {
        type: 'object',
        properties: {
            ReasonForNotUsingLowestPrice: {
                name: 'ReasonForNotUsingLowestPrice',
                title: '选择组件',
                required: true,
                readOnly: false,
                type: 'array',
                'x-index': 0,
                'x-component': 'Select',
                'x-component-props': {
                    title: '未用最低价原因',
                    placeholder: '请选择',
                },
                'x-config': {
                    permission: {
                        editable: true,
                        selectable: true,
                        deletable: true,
                    },
                },
                // 'x-decorator': 'ItemDecorator',
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            reportInfo: {
                name: 'reportInfo',
                title: '消费信息',
                type: 'void',
                properties: {
                    ConsumeDescription: {
                        name: 'ConsumeDescription',
                        title: '输入框组件',
                        required: true,
                        readOnly: false,
                        type: 'string',
                        'x-index': 0,
                        'x-component': 'Input',
                        'x-component-props': {
                            title: '消费说明',
                            placeholder: '请填写本次消费的说明1',
                            type: 'textarea',
                            required: true,
                        },
                        'x-b-name': 'ConsumeDescription',
                        'x-config': {
                            permission: {
                                editable: true,
                                selectable: true,
                                deletable: true,
                            },
                            group: {
                                code: 'reportInfo',
                                name: '消费信息',
                                order: 4,
                                type: 'void',
                            },
                        },
                    },
                },
                'x-index': 1,
                'x-component': 'Card',
                'x-component-props': {
                    title: '消费信息',
                },
                'x-config': {
                    group: {
                        code: 'reportInfo',
                        name: '消费信息',
                        order: 4,
                        type: 'void',
                    },
                },
                // 'x-decorator': 'ItemDecorator',
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
            customForm: {
                name: 'customForm',
                title: '',
                type: 'object',
                properties: {
                    Select_0194685988854260: {
                        name: 'Select_0194685988854260',
                        title: '选择组件',
                        required: true,
                        readOnly: false,
                        type: 'array',
                        'x-index': 0,
                        'x-component': 'Select',
                        'x-component-props': {
                            title: '选择组件',
                            placeholder: '请选择',
                            type: 'single',
                            required: true,
                            titles: [
                                '选择组件',
                            ],
                        },
                        'x-b-name': 'Select',
                        'x-config': {
                            permission: {
                                editable: true,
                                selectable: true,
                                deletable: true,
                            },
                            group: {
                                code: 'customForm',
                                name: '',
                                order: 9999,
                                type: 'object',
                            },
                        },
                    },
                },
                'x-index': 2,
                'x-component': 'Card',
                'x-component-props': {
                },
                'x-config': {
                    group: {
                        code: 'customForm',
                        name: '',
                        order: 9999,
                        type: 'object',
                    },
                },
                // 'x-decorator': 'ItemDecorator',
                'x-decorator-props': {
                    type: 'IndepItem',
                },
            },
        },
    }
}