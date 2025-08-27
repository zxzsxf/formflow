// 定义输入和输出的属性类型
interface Property {
  type: string;
  title?: string;
  description?: string;
  properties?: Record<string, Property>;
  required?: string[] | boolean;
  items?: {
    type?: string;
  };
  name?: string;
}

// 定义输入结构
interface InputSchema {
  flowFormSchema: {
    type: string;
    properties: Record<string, Property>;
    required?: string[];
  };
}

// 定义输出结构
interface TransformedSchema {
  flowFormSchema: {
    type: string;
    properties: Record<string, Property>;
    required: string[];
  };
}

/**
 * 转换 FlowForm Schema 到 TypeScript 类型定义
 * @param input - 输入的 Schema
 * @throws {Error} 如果输入参数为空或格式不正确
 */
export function transFFSchemaToTs(input: Required<InputSchema>): TransformedSchema {
  // console.log("input is", JSON.stringify(input));
  if (!input?.flowFormSchema?.properties) {
    throw new Error("Invalid input schema: missing required properties");
  }

  function transformProperties(
    properties: Record<string, Property>,
    parentRequiredFields: string[] = []
  ): [Record<string, Property>, string[]] {
    const transformed: Record<string, Property> = {};
    const requiredFields: string[] = [...parentRequiredFields];

    function processProperty(prop: Property, key: string): any | null {
      if (!prop?.type) {
        return null;
      }

      // 如果是 void 类型且有子属性，递归处理子属性
      if (prop.type === "void" && prop.properties) {
        const [processedChildren, childRequiredFields] = transformProperties(
          prop.properties,
          requiredFields
        );
        if (Object.keys(processedChildren).length > 0) {
          requiredFields.push(...childRequiredFields);
          return { properties: processedChildren };
        }
        return null;
      }

      // 如果不是 void 类型，处理当前属性
      if (prop.type !== "void") {
        const newProperty: any = {
          type: prop.type,
        };

        // 处理 联合类型，"string" | "number" 转化成 ["string", "number"]
        if (prop.type.includes("|")) {
          newProperty.type = prop.type.split("|").map((item) => item.trim());
        }

        // 处理标题
        if (prop.title) {
          newProperty.description = prop.title;
        }

        // 处理子属性
        if (prop.properties) {
          const [processedProperties, childRequiredFields] =
            transformProperties(prop.properties, []);
          if (Object.keys(processedProperties).length > 0) {
            newProperty.properties = processedProperties;
            if (childRequiredFields.length > 0) {
              newProperty.required = childRequiredFields;
            }
          }
        }

        // 处理当前属性的 required
        if (prop.required === true) {
          requiredFields.push(key);
        }

        // 处理对象数组，即 items 不为空对象
        if (prop.type === "array" && prop.items) {
          if (Object.keys(prop.items).length > 0) {
            newProperty.items = {
              type: prop.items.type || "object",
            };
          }
        }

        return newProperty;
      }

      return null;
    }

    // 处理每个属性
    for (const [key, value] of Object.entries(properties)) {
      const processed = processProperty(value, key);
      if (processed !== null) {
        if (processed.properties && !processed.type) {
          // 如果只有 properties，将子属性提升到当前层级
          Object.assign(transformed, processed.properties);
        } else {
          transformed[key] = processed;
        }
      }
    }

    return [transformed, requiredFields];
  }

  // console.log(
  //   "input.flowFormSchema.properties is",
  //   JSON.stringify(input.flowFormSchema.properties)
  // );
  const [transformedProperties, rootRequiredFields] = transformProperties(
    input.flowFormSchema.properties
  );

  return {
    flowFormSchema: {
      type: input.flowFormSchema.type,
      properties: transformedProperties,
      required: rootRequiredFields,
    },
  };
}