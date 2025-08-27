import chalk from "chalk";

export const errorLog = (msg: string) => {
  console.log(chalk.black.bgRed("Error ❌") + "  " + chalk.redBright(msg));
};

export const successLog = (msg: string) => {
  console.log(
    chalk.black.bgGreen("Success ✅") + "  " + chalk.greenBright(msg)
  );
};

export const infoLog = (msg: string) => {
  console.log(
    chalk.black.bgYellow("Info ⚠️") + +"  " + chalk.yellowBright(msg)
  );
};

export const createCustomError = (message: string, statusCode: number) => {
  const error: any = new Error(message);
  error.statusCode = statusCode;
  error.message = message;
  Error.captureStackTrace(error, createCustomError);
  return error;
};