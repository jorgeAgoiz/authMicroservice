import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const MONGODB_URI: any = process.env.MONGODB_URI;
export const SECRET: any = process.env.JWT_SECRET;
