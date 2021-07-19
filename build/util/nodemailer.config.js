"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_vars_1 = require("./env.vars");
const USER = env_vars_1.MAIL_NAME;
const PASS = env_vars_1.APP_GOOGLE_PASS;
exports.transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: USER,
        pass: PASS,
    },
});
//# sourceMappingURL=nodemailer.config.js.map