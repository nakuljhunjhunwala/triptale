import { Request, Response } from "express";
import { createRefreshToken, createToken, verifyRefreshToken } from "../tokenManager/token-manager";

import { IUser } from "../models/user-model";
import { UserServices } from "../services/user-services";
import { UserUtil } from "../utils/user-utils";
import hashPassword from "../validation/hashPassword";

const userServices = new UserServices();
export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const body = req.body;

    const userPassword = hashPassword(body.password);
    try {
      const newUser: Partial<IUser> = Object.assign({}, body);
      const clientId = req.clientId;
      newUser['password'] = userPassword;      

      const user = await userServices.createUser(newUser);
      const token = await createToken(user);
      const refreshToken = await createRefreshToken(user);

      user.refreshToken.set(clientId, { token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });

      await user.save();
      res
        .header("auth-token", token)
        .header("refresh-token", refreshToken)
        .status(global.httpStatus.OK)
        .json({ authToken: token, refreshToken: refreshToken });

    } catch (err) {
      if (res.headersSent) {
        return;
      }
      res.status(err.status || global.httpStatus.BAD_REQUEST).json({
        message: err.message || "Error While creating user",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const body = req.body;
    const userPassword = hashPassword(body.password);
    const clientId = req.clientId;

    try {
      const user = await userServices.login(body.email, userPassword);
      const token = await createToken(user);
      const refreshToken = await createRefreshToken(user);

      user.refreshToken.set(clientId, { token: refreshToken, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
      await user.save();

      res
        .header("auth-token", token)
        .header("refresh-token", refreshToken)
        .status(global.httpStatus.OK)
        .json({ authToken: token, refreshToken: refreshToken });

    } catch (err) {
      res.status(err.status || global.httpStatus.BAD_REQUEST).json({
        message: err.message || "Error While Logging In",
      });
    }
  }

  async getTokenByRefreshToken(req: Request, res: Response): Promise<void> {
    const refreshToken = req.headers["refresh-token"] as string;    
    if (!refreshToken) {
      res.status(global.httpStatus.UNAUTHORIZED).json({
        message: "Refresh Token not found",
      });
      return;
    }
    try {
      const validTokenData = await verifyRefreshToken(refreshToken);      
      const user = await userServices.getUser(validTokenData._id);      
      const isTokenValid = user.refreshToken.get(req.clientId)?.token === refreshToken;      
      const newRefreshToken = await UserUtil.updateTokenIfExpiring(refreshToken, req.clientId,user);
      if (isTokenValid) {
        const token = await createToken(user);
        res
          .header("auth-token", token)
          .header("refresh-token", newRefreshToken)
          .status(global.httpStatus.OK)
          .json({ authToken: token, refreshToken: refreshToken });
      } else {
        res.status(global.httpStatus.UNAUTHORIZED).json({
          message: "Refresh Token not valid for this client",
        });
      }

    } catch (err) {
      res.status(err.status || global.httpStatus.BAD_REQUEST).json({
        message: err.message || "Error While getting token",
      });
    }

  }

  async me(req: Request, res: Response): Promise<void> {
    const id = req.userId;
    try {
      const user = await userServices.getUser(id,UserUtil.fetchUserDataOptions());
      res.status(global.httpStatus.OK).json(user);
    } catch (err) {
      res.status(err.status || global.httpStatus.BAD_REQUEST).json({
        message: err.message || "Error While getting user",
      });
    }
  }

  async updateUserInfo(req: Request, res: Response): Promise<void> {
    const id = req.userId;
    const body = req.body;
    try {
      const user = await userServices.updateUser(id, body,UserUtil.fetchUserDataOptions());
      res.status(global.httpStatus.OK).json(user);
    } catch (err) {
      res.status(err.status || global.httpStatus.BAD_REQUEST).json({
        message: err.message || "Error While updating user",
      });
    }
  }
}
