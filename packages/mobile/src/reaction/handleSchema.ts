import { FORM_STATUS } from '../const/constants';

interface SchemaResponse {
    schemaRes: {
      formTemplateId: string;
      formTemplateSnapshotId: string | null;
      schemas: {
        properties: object;
        type: string;
      };
    };
    isSuccess: boolean;
    error?: string;
  }
const handleNotice = (schema: object) => {
    console.log('handleNotice', schema);
}
const handleCard = (schema: object) => {
    console.log('handleCard', schema);
}

const getFormSchema = async ({
    formTemplateId = '',
    editStatus = FORM_STATUS.MODIY_EDIT,
    reportSwitch = false
  }: {
    formTemplateId?: string;
    editStatus?: number;
    reportSwitch?: boolean;
  }): Promise<SchemaResponse> => {
  
    const DEFAULT_SCHEMA = {
      schemas: {
        properties: {},
        type: 'object',
      },
    };
  
    if (!reportSwitch) {
      return {
        schemaRes: {
          formTemplateId,
          formTemplateSnapshotId: null,
          ...DEFAULT_SCHEMA,
        },
        isSuccess: true,
      };
    }
  
    try {
    //   const { data } = await Api.getSchema({ editStatus, formTemplateId });
      const res = await fetch(`/api/form/schema?editStatus=${editStatus}&formTemplateId=${formTemplateId}`);
      const data = await res.json();
      const schemaRes = data ? JSON.parse(data) : null;
      return {
        schemaRes: schemaRes || {
          formTemplateId,
          formTemplateSnapshotId: null,
          ...DEFAULT_SCHEMA,
        },
        isSuccess: true,
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '未知错误';
      console.error('表单Schema获取失败:', {
        formTemplateId,
        editStatus,
        error: errorMessage,
      });
      return {
        schemaRes: {
          formTemplateId: formTemplateId || '',
          formTemplateSnapshotId: null,
          ...DEFAULT_SCHEMA,
        },
        isSuccess: false,
        error: errorMessage,
      };
    }
  };
  
  // 文件结尾统一导出
export {
    handleNotice,
    handleCard,
    getFormSchema,
};
