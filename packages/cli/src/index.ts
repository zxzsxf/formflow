// @ts-ignore
import pkg from "../package.json";
import { commandStart } from "./command/start";
import { Command } from "commander";

const program = new Command();

program
  .name(Object.keys(pkg.bin)[0])
  .version(pkg.version)
  .command("start")
  .description("启动 flowform 服务")
  /**
   * 示例:
   * ff-cli start // 启动一个Express服务器，默认端口7066
   */
  .action(async (options) => {
    await commandStart(options);
  });

program.parse(process.argv);

