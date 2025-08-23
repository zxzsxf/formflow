export const schemas = {
    type: 'object',
    properties: {
      'Group_1': {
        type: 'object',
        properties: {
          DatePicker: {
            type: 'string',
            'x-component': 'DatePicker',
          },
        },
        'x-component': 'Card',
      },
      'Group_2': {
        type: 'object',
        properties: {
          input: {
            type: 'string',
            'x-component': 'Input',
          },
        },
        'x-component': 'Card',
      },
      'Group_3': {
        type: 'object',
        properties: {
          DatePicker: {
            type: 'string',
            'x-component': 'DatePicker',
          },
        },
        'x-component': 'Card',
      },
      'Group_5': {
        type: 'object',
        properties: {
          TestMicro: {
            type: 'string',
            'x-component': 'TestMicro',
            'x-component-props': {
              placeholder: '微件测试',
              title: '微件测试',
            },
          },
        },
        'x-component': 'Card',
      },
      'Group_6': {
        type: 'object',
        properties: {
          DatePicker: {
            type: 'string',
            'x-component': 'DatePicker',
            'x-component-props': {
              placeholder: '请选择日期',
            },
          },
        },
        'x-component': 'Card',
      },
    },
  }
  