"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_vars_1 = require("../util/env.vars");
const user_1 = __importDefault(require("../models/user"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return res
                .status(403)
                .json({ message: "Token not found", status_code: 403 });
        }
        if (!authorization.toLowerCase().startsWith("bearer")) {
            return res
                .status(401)
                .json({ message: "Invalid Token", status_code: 401 });
        }
        const token = authorization.substring(7);
        const decoded = jsonwebtoken_1.default.verify(token, env_vars_1.SECRET);
        const user = yield user_1.default.findById(decoded.id);
        if (!user) {
            return res
                .status(404)
                .json({ message: "User not found", status_code: 404 });
        }
        req.body.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(400).json({ message: error.message, status_code: 400 });
    }
});
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.jwt.js.map