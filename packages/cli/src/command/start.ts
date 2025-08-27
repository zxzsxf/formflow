import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import portfinder from "portfinder";
// eslint-disable-next-line @typescript-eslint/no-duplicate-imports
import { Express, Request, Response, NextFunction } from "express";
import router from "../router";
import { successLog } from "../utils";
import { errorHandler } from "../middleware";
import { saveAll } from "../routes/saveAll";

export const commandStart = async (options?: {
  path?: boolean;
  address?: boolean;
}) => {
  dotenv.config();

  const app: Express = express();
  const port = process.env.PORT || 50922;

  //  跨域
  app.use(cors());
  // 解析 application/json 类型的数据
  app.use(express.json());
  // 解析 application/x-www-form-urlencoded 类型的数据
  app.use(express.urlencoded({ extended: true }));

  app.all("*", function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method === "OPTIONS") res.send(200);
    else next();
  });

  app.use(router);

  /**
   * 注册 saveAll 路由
   * 将命令行的 options 传递给 saveAll 函数
   * 这样可以根据不同的命令行选项生成不同的文件
   */
  app.post("/saveAll", async (req, res, next) => {
    await saveAll(req, res, next, options);
  });

  app.use(errorHandler);


  app.listen(port, () => {
    const host = `http://127.0.0.1:${port}`;
    successLog(`🚀🚀🚀 Server ready at ${host}`);
  });
};