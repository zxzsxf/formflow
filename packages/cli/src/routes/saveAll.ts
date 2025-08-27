import fs from "fs";
import path from "path";
import { cloneDeep } from "lodash-es";
const JSONSchemaToTypescript = require("json-schema-to-typescript");
const { compile } = JSONSchemaToTypescript;
import { Request, Response, NextFunction } from "express";
import {
  successLog,
  createCustomError,
  transFFSchemaToTs,
} from "../utils";

// 写入 JSON 文件
const writeJsonFile = async (
  ffDirPath: string,
  formCode: string,
  data: any
) => {
  if (!fs.existsSync(ffDirPath)) {
    try {
      fs.mkdirSync(ffDirPath, { recursive: true });
    } catch (err) {
      throw createCustomError("Failed to create .ff directory", 500);
    }
  }

  const filePath = path.join(ffDirPath, `${formCode}.json`);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    successLog(`Write ${formCode}.json successfully`);
  } catch (err) {
    throw createCustomError(`Failed to write ${formCode}.json`, 400);
  }
};

// 写入 TypeScript 类型定义
const writeTypeDefinition = async (
  tsDirPath: string,
  formCode: string,
  data: any
) => {
  if (!fs.existsSync(tsDirPath)) {
    try {
      fs.mkdirSync(tsDirPath, { recursive: true });
    } catch (err) {
      throw createCustomError("Failed to create type directory", 500);
    }
  }

  const tsFilePath = path.join(tsDirPath, `${formCode}.ts`);
  try {
    const flowFormSchemaTS = await compile(
      transFFSchemaToTs(cloneDeep(data))?.flowFormSchema,
      `${formCode}Props`
    );
    fs.writeFileSync(tsFilePath, flowFormSchemaTS);
    successLog(`Write ${formCode}.ts successfully`);
  } catch (err) {
    throw createCustomError(
      `Failed to generate TypeScript definition for ${formCode}`,
      400
    );
  }
};

export const saveAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { formCode } = req.body;

    // 定义各个目录路径
    const ffDirPath = path.join(process.cwd(), ".ff");
    const tsDirPath = path.join(process.cwd(), "src/types/ff-types");

    // 写入 JSON 文件
    await writeJsonFile(ffDirPath, formCode, req.body);

    // 写入 TypeScript 类型定义
    await writeTypeDefinition(tsDirPath, formCode, req.body);
    
    res.send({
      code: 0,
      msg: `Files generated successfully`,
      data: { isSaveSuccess: true },
    });
  } catch (err) {
    next(err);
  }
};
