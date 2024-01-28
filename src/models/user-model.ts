import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    min: 8,
  },
  countryCode: {
    type: String,
  },
  phoneNo: {
    type: Number,
    unique: true,
    sparse: true
  },
  gender:{
    type:String
  },
  profilePhoto: {
    type: String,
  },
  refreshToken:{
    type:Map,
    of:{
      token:String,
      expiresAt:Date
    },
    default:new Map()
  }
},{
  timestamps:true
});

export const UserModal = mongoose.model<IUser>("User", userSchema);
export interface IUser extends mongoose.Document{
  name: string;
  email: string;
  password?: string;
  phoneNo?: number;
  countryCode?: string;
  gender?:string;
  profilePhoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  refreshToken:Map<string,{token:string,expiresAt:Date}>;
}
