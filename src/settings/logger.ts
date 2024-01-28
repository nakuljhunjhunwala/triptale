import { Logger, createLogger, format, transports } from "winston";

import path from "path";

const INSTANCE = Symbol('Logger');
const environment = process.env.ENVIRONMENT;


class LoggerContainer {

  static get instance() {
    if (!this[INSTANCE]) {
      this[INSTANCE] = new LoggerContainer();
    }
    return this[INSTANCE];
  }

  levels = () => {
    return {
      debug: 5,
      error: 0,
      http: 3,
      info: 2,
      verbose: 4,
      warn: 1
    };
  }

  setLevel = (env: string) => {
    if (env === "production") {
      return "info";
    }
    if (env === "testing") {
      return "error";
    }
    return "debug";
  };

  getLabel = (file: NodeModule) => {
    console.log(file, path.sep);
    const parts = file.filename; //.split(path.sep);    
    return parts; //path.join(parts[parts.length - 2], parts.pop());
  }

  getLogger(moduleName: NodeModule) {
    const logger = this.createLogger(moduleName);
    logger.level = this.setLevel(environment);
    return logger;
  }

  createLogger(moduleName: NodeModule) : Logger {
    return createLogger({
      format: format.combine(
        format.label({ label: this.getLabel(moduleName) }),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json(),
      ),
      // this.levels(),
      transports: [
        new transports.Console({
          level: this.setLevel(environment),
        }),
      ],
    });
  }
}

export {LoggerContainer, Logger}