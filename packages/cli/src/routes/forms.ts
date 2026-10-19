import * as fs from "fs";
import * as path from "path";
import { Request, Response, NextFunction, Router } from "express";
import { cloneDeep } from "lodash-es";
import { transFFSchemaToTs } from "../utils";

const { compile } = require("json-schema-to-typescript");
const formCodePattern = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const routePattern = /^\/forms\/[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?(?:\/[a-z0-9]+(?:[a-z0-9-]*[a-z0-9])?)*$/;

type Placement = "inline" | "route";
interface FormRecord {
  formCode: string;
  title: string;
  placement: Placement;
  path?: string;
  updatedAt: number;
}

const storageRoot = () => path.join(process.cwd(), "public", "flowforms");
const indexPath = () => path.join(storageRoot(), "index.json");
const schemaPath = (formCode: string) => path.join(storageRoot(), `${formCode}.json`);
const typePath = (formCode: string) => path.join(process.cwd(), "src", "types", "ff-types", `${formCode}.ts`);

const badRequest = (message: string, statusCode = 400) => Object.assign(new Error(message), { statusCode });

const readIndex = (): FormRecord[] => {
  if (!fs.existsSync(indexPath())) return [];
  const parsed = JSON.parse(fs.readFileSync(indexPath(), "utf8"));
  if (!Array.isArray(parsed)) throw badRequest("Invalid form index", 500);
  return parsed;
};

const validate = (body: any): { formCode: string; title: string; placement: Placement; path?: string; schema: any } => {
  const { formCode, title, placement, schema } = body || {};
  if (typeof formCode !== "string" || !formCodePattern.test(formCode) || formCode.toLowerCase() === "index") throw badRequest("Invalid formCode");
  if (typeof title !== "string" || !title.trim() || title.trim().length > 100) throw badRequest("Invalid title");
  if (placement !== "inline" && placement !== "route") throw badRequest("Invalid placement");
  if (!schema || schema.type !== "object" || !schema.properties || typeof schema.properties !== "object" || Array.isArray(schema.properties)) {
    throw badRequest("Invalid form schema");
  }
  const routePath = placement === "route" ? body.path : undefined;
  if (placement === "route" && (typeof routePath !== "string" || !routePattern.test(routePath))) {
    throw badRequest("Route path must be under /forms/ with lowercase URL segments");
  }
  return { formCode, title: title.trim(), placement, path: routePath, schema };
};

const writeAtomic = (destination: string, contents: string) => {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  const temporary = `${destination}.${process.pid}.${Date.now()}.tmp`;
  try {
    fs.writeFileSync(temporary, contents, "utf8");
    fs.renameSync(temporary, destination);
  } finally {
    if (fs.existsSync(temporary)) fs.unlinkSync(temporary);
  }
};

export const formRouter: Router = Router();

formRouter.get("/api/forms", (_req: Request, res: Response, next: NextFunction) => {
  try { res.send({ code: 0, data: readIndex() }); } catch (error) { next(error); }
});

formRouter.get("/api/forms/:formCode", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { formCode } = req.params;
    if (!formCodePattern.test(formCode) || formCode.toLowerCase() === "index") throw badRequest("Invalid formCode");
    const record = readIndex().find(item => item.formCode === formCode);
    if (!record || !fs.existsSync(schemaPath(formCode))) throw badRequest("Form not found", 404);
    const stored = JSON.parse(fs.readFileSync(schemaPath(formCode), "utf8"));
    res.send({ code: 0, data: { ...record, schema: stored.schema } });
  } catch (error) { next(error); }
});

formRouter.post("/api/forms", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const input = validate(req.body);
    const records = readIndex();
    const current = records.find(item => item.formCode.toLowerCase() === input.formCode.toLowerCase());
    if (current && current.formCode !== input.formCode) throw badRequest("formCode already exists", 409);
    if (current && current.placement !== input.placement) throw badRequest("Form placement cannot be changed", 409);
    if (input.path && records.some(item => item.path === input.path && item.formCode !== input.formCode)) {
      throw badRequest("Route path already exists", 409);
    }
    let types: string;
    try {
      const typeSchema = transFFSchemaToTs({ flowFormSchema: cloneDeep(input.schema) } as any).flowFormSchema;
      types = await compile(typeSchema, `${input.formCode}Props`);
    } catch {
      throw badRequest("Invalid form schema");
    }
    const record: FormRecord = {
      formCode: input.formCode,
      title: input.title,
      placement: input.placement,
      ...(input.path ? { path: input.path } : {}),
      updatedAt: Date.now(),
    };
    const nextRecords = [...records.filter(item => item.formCode !== input.formCode), record];
    writeAtomic(typePath(input.formCode), types);
    writeAtomic(schemaPath(input.formCode), JSON.stringify({ ...record, schema: input.schema }, null, 2));
    writeAtomic(indexPath(), JSON.stringify(nextRecords, null, 2));
    res.send({ code: 0, data: record });
  } catch (error) { next(error); }
});
