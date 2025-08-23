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
      'Group_4': {
        type: 'object',
        properties: {
          Button: {
            type: 'string',
            'x-component': 'Button',
            'x-component-props': {
              type: 'primary',
              onClick: () => {
                console.log('click')
              },
              text: '提交'
            }
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
              placeholder: '请选择日期',
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
  