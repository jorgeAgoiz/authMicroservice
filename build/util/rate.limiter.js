"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
exports.apiLimiter = express_rate_limit_1.default({
    windowMs: 10 * 60 * 1000,
    max: 120,
    message: "Too many request from this IP, please try again after a ten minutes.",
});
//# sourceMappingURL=rate.limiter.js.map