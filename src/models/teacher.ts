import * as mongoose from "mongoose";
import { ITeacher } from "../types/auth";

const Schema = mongoose.Schema;

const teacherSchema = new Schema(
  {
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
        required: true,
      },
    ],
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ITeacher>("Teacher", teacherSchema);
