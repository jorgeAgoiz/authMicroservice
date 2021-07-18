import nodemailer from "nodemailer";
import { APP_GOOGLE_PASS, MAIL_NAME } from "./env.vars";

const USER = MAIL_NAME;
const PASS = APP_GOOGLE_PASS;

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: USER,
    pass: PASS,
  },
});
