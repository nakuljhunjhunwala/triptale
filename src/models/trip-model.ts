import { UserUtil } from "../utils/user-utils";
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
    },
    membersCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

tripSchema.pre("populate", function (next) {
  this.populate("createdBy", UserUtil.fetchUserDataOptions());
  next();
});

export const TripModal = mongoose.model<ITrip>("Trip", tripSchema);

export interface ITrip extends mongoose.Document {
  title: string;
  isPrivate: boolean;
  description?: string;
  membersCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy: string;
}
