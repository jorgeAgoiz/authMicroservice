import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const MONGODB_URI: any = process.env.MONGODB_URI;
export const SECRET: any = process.env.JWT_SECRET;
export const ACCESS_KEY_AWS: any = process.env.ACCESS_KEY_AWS;
export const SECRET_KEY_AWS: any = process.env.SECRET_KEY_AWS;
export const BUCKET_NAME: any = process.env.BUCKET_NAME;
