import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import portfinder from "portfinder";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { Express } from "express";
import router from "../router";
import { successLog } from "../utils";
import { errorHandler } from "../middleware";
import { formRouter } from "../routes/forms";

export const commandStart = async (options?: {
  path?: boolean;
  address?: boolean;
}) => {
  dotenv.config();

  const app: Express = express();
  const port = Number(process.env.PORT || 7066);
  const editorOrigins = new Set(['http://localhost:6575', 'http://127.0.0.1:6575']);
  if (process.env.FLOWFORM_EDITOR_ORIGIN) editorOrigins.add(process.env.FLOWFORM_EDITOR_ORIGIN);

  //  跨域
  app.use(cors({ origin: (origin, callback) => {
    if (!origin || editorOrigins.has(origin)) callback(null, true);
    else callback(new Error("Origin not allowed"));
  } }));
  // 解析 application/json 类型的数据
  app.use(express.json());
  // 解析 application/x-www-form-urlencoded 类型的数据
  app.use(express.urlencoded({ extended: true }));

  app.use(router);
  app.use(formRouter);

  app.use(errorHandler);


  app.listen(port, "127.0.0.1", () => {
    const host = `http://127.0.0.1:${port}`;
    successLog(`🚀🚀🚀 Server ready at ${host}`);
  });
};
