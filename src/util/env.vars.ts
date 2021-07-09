import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const PORT = process.env.PORT;
export const DBNAME: any = process.env.DB_NAME;
export const DBUSER: any = process.env.DB_USER;
export const DBPASS: any = process.env.DB_PASS;
export const DBPORT: any = process.env.DB_PORT;
