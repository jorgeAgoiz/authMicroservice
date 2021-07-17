import { File } from "aws-sdk/clients/codecommit";
import { Document } from "mongoose";
import { type } from "os";

export interface IUser extends Document {
  type_user: string;
  full_name: string;
  email: string;
  password: string;
  birthday: Date;
  languages?: Array<string>;
  province: string;
  city: string;
  profile_picture?: string; // Nueva propiedad
}

export interface IPicture {
  fieldname?: string;
  originalname?: string;
  encoding?: string;
  mimetype?: string;
  size?: number;
  bucket?: string;
  key?: string;
  acl?: string;
  contentType?: string;
  contentDisposition?: any;
  storageClass?: string;
  serverSideEncryption?: any;
  metadata?: { fieldName: string };
  location?: string;
  etag?: string;
  versionId?: any;
}

export type Reminder = {
  email: string;
  userId: string;
};
