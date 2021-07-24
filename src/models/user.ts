import * as mongoose from "mongoose";
import { IUser } from "../types/auth";

const Schema: typeof mongoose.Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    type_user: {
      type: String,
      required: true,
      enum: ["teacher", "student"],
    },
    full_name: {
      type: String,
      required: true,
      unique: true,
      minLength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    languages: [
      {
        type: String,
        lowercase: true,
      },
    ],
    province: {
      type: String,
      required: true,
      lowercase: true,
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    profile_picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
