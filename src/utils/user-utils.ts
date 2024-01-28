import { createRefreshToken, verifyRefreshToken } from "../tokenManager/token-manager";

import { IUser } from './../models/user-model';

export class UserUtil {
    static fetchUserDataOptions() {
        return {
            _v: false,
            password: false,
            refreshToken: false
        }
    }

    static async updateTokenIfExpiring(refreshToken: string, clientId: string,user: IUser): Promise<string>{
        try {
          const tokenData = await verifyRefreshToken(refreshToken);
          // Check if token is expiring in 1 day or less and update it
          if (tokenData.exp - Date.now() / 1000 < 24 * 60 * 60) {
            const token = await createRefreshToken(user);
            user.refreshToken.set(clientId, { token: token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            await user.save();
            return token;
          }
          return refreshToken;
        } catch (err) {
          console.log(err);
          return refreshToken;
        }
      }
}