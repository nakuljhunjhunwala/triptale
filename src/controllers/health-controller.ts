import { Request, Response, NextFunction } from "express";

import { BaseController } from "./base-controller";

export class HealthController extends BaseController {
  getStatus(req: Request, res: Response, next: NextFunction): any {
    try {
      return res.status(global.httpStatus.OK).json({
        version: "1",
        releaseID: "1.0.0",
        appID: "platform_configurations",
        details: {
          uptime: {
            componentType: "system",
            metricValue: process.uptime(),
            metricUnit: "seconds",
            time: new Date()
          }
        }
      });
    } catch (e) {
      next(e);
    }
  }
}
