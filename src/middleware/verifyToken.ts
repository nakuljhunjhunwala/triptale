import { NextFunction, Request, Response } from "express";

import { verifyToken } from "../tokenManager/token-manager";

export async function verify(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req?.header("auth-token");
    if (!token) {
      res
        .status(global.httpStatus.UNAUTHORIZED)
        .json({ message: "Access Denied" });
    } else {
      const verified: object | string = await verifyToken(token);
      const verifiedObject =
        typeof verified === "object" ? verified : JSON.parse(verified);
      if (verifiedObject) {
        req.userId = verifiedObject?._id;
      } else {
        res
          .status(global.httpStatus.BAD_REQUEST)
          .json({ message: "Invalid Token" });
      }

      next();
    }
  } catch (error) {
    res
      .status(global.httpStatus.BAD_REQUEST)
      .json({ message: error.message || "Invalid Token" });
  }
}

