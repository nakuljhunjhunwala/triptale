import { IUser, UserModal } from "../models/user-model";

export class UserServices {
  async createUser(user: Record<string,any>): Promise<IUser> {
    try {
      const userExist = await this.findUserByEmail(user.email);
      if (userExist) {
        throw {
          status: 409,
          message: "User already exist",
        };
      } else {
        const userObj = new UserModal({
          email: user.email,
          password: user.password,
          name: user.name
        });

        if (user.phoneNo)
          userObj.phoneNo = user.phoneNo
        if (user.countryCode)
          userObj.countryCode = user.countryCode
        if(user.profilePhoto)
          userObj.profilePhoto = user.profilePhoto          
        return await userObj.save();
      }
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while creating user",
      };
    }
  }

  async login(email: string, password: string): Promise<IUser> {
    try {
      const user: IUser = await this.findUserByEmail(email);

      if (user) {
        if (user.password === password) {
          return user;
        } else {
          throw {
            status: 401,
            message: "Invalid password",
          };
        }
      } else {
        throw {
          status: 404,
          message: "Invalid email",
        };
      }
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while finding user",
      };
    }
  }

  async findUserByEmail(email: string, options: Record<string,boolean> = {}): Promise<IUser> {
    try {
      return UserModal.findOne({ email: email },options);
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while finding user",
      };
    }
  }

  async getUser(id: string, options: Record<string,boolean> = {}): Promise<IUser> {
    try {
      return UserModal.findById(id,options);
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while finding user",
      };
    }
  }

  async updateUser(id: string, user: Partial<IUser>, options: Record<string,boolean> = {}): Promise<IUser> {
    try {
      return UserModal.findByIdAndUpdate(id, user,{
        new: true,
        fields: options
      });
    } catch (error) {
      throw {
        status: error.status || 500,
        message: error.message || "Error Ocurred while finding user",
      };
    }
  }

}
