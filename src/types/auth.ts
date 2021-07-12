import { Document } from "mongoose";

export interface ITeacher extends Document {
  full_name: string;
  email: string;
  password: string;
  birthday: Date;
  languages: Array<string>;
  province: string;
  city: string;
}
