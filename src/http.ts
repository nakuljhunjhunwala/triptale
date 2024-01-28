import dotenv = require("dotenv");

import * as bodyParser from "body-parser";

import { LoggerContainer } from "./settings/logger";
import { configureRoutes } from "./routes";
import cookieParser from "cookie-parser"
import crypto from "crypto";
import { globalSettings } from "./settings/globals";
import { handleRoute } from "./middleware/handleRoute";
import mongoose from "mongoose";

import express = require("express");

dotenv.config();

const app: express.Application = express();
app.enable("etag");
app.set("etag", "strong");

const logger = LoggerContainer.instance.getLogger("HTTP");
const normalizePort: (value: string | number) => number = (
  value: string | number
) => {
  const port = Number(value);
  if (isNaN(port)) {
    logger.error("Port must have numeric value");
    process.exit(1);
  }
  if (port > 0) return port;
  logger.error("Invalid port number");
  process.exit(1);
};

function run(): void {
  globalSettings();

  app.use(bodyParser.json({ limit: "5mb" }));
  app.use(bodyParser.json({ type: "application/*+json", limit: "50mb" }));
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: "5mb",
    })
  );
  app.use(cookieParser());
  app.use((req, res, next) => {    
    let clientId = req.cookies?.clientId;
  
    if (!clientId) {
      clientId = crypto.randomBytes(16).toString('hex');
      res.cookie('clientId', clientId, { 
        maxAge: 365 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === 'production',
      }); // Set cookie to last for one year
    }
    
    req.clientId = clientId;
    next();
  });
  configureRoutes(app);
  app.use(handleRoute);

  const httpPort: number = normalizePort(process.env.PORT || 8888);
  app.listen(httpPort, "0.0.0.0", async () => {
    mongoose.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );
    logger.info("Platform configuration server started", { port: httpPort });
  });
}

run();
