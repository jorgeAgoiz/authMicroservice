import { Document } from "mongoose";

export interface IUser extends Document {
  type_user: string;
  full_name: string;
  email: string;
  password: string;
  birthday: Date;
  languages?: Array<string>;
  province: string;
  city: string;
}
