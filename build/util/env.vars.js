"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBPORT = exports.DBPASS = exports.DBUSER = exports.DBNAME = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
exports.PORT = process.env.PORT;
exports.DBNAME = process.env.DB_NAME;
exports.DBUSER = process.env.DB_USER;
exports.DBPASS = process.env.DB_PASS;
exports.DBPORT = process.env.DB_PORT;
//# sourceMappingURL=env.vars.js.map