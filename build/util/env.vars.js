"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_GOOGLE_PASS = exports.MAIL_PASS = exports.MAIL_NAME = exports.BUCKET_REGION = exports.BUCKET_NAME = exports.SECRET_KEY_AWS = exports.ACCESS_KEY_AWS = exports.SECRET = exports.MONGODB_URI_TEST = exports.MONGODB_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
exports.PORT = process.env.PORT;
exports.MONGODB_URI = process.env.MONGODB_URI;
exports.MONGODB_URI_TEST = process.env.MONGODB_URI_TEST;
exports.SECRET = process.env.JWT_SECRET;
exports.ACCESS_KEY_AWS = process.env.ACCESS_KEY_AWS;
exports.SECRET_KEY_AWS = process.env.SECRET_KEY_AWS;
exports.BUCKET_NAME = process.env.BUCKET_NAME;
exports.BUCKET_REGION = process.env.BUCKET_REGION;
exports.MAIL_NAME = process.env.MAIL_NAME;
exports.MAIL_PASS = process.env.MAIL_PASS;
exports.APP_GOOGLE_PASS = process.env.APP_GOOGLE_PASS;
//# sourceMappingURL=env.vars.js.map