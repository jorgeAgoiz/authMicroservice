import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const MONGODB_URI: any = process.env.MONGODB_URI;
export const MONGODB_URI_TEST: any = process.env.MONGODB_URI_TEST;
export const SECRET: any = process.env.JWT_SECRET;
export const ACCESS_KEY_AWS: any = process.env.ACCESS_KEY_AWS;
export const SECRET_KEY_AWS: any = process.env.SECRET_KEY_AWS;
export const BUCKET_NAME: any = process.env.BUCKET_NAME;
export const BUCKET_REGION: any = process.env.BUCKET_REGION;
export const MAIL_NAME: any = process.env.MAIL_NAME;
export const MAIL_PASS: any = process.env.MAIL_PASS;
export const APP_GOOGLE_PASS: any = process.env.APP_GOOGLE_PASS;
