"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const auth_jwt_1 = require("../middlewares/auth.jwt");
const authRouter = express_1.default.Router();
// POST Sign Up Users
authRouter.post("/auth/signup", auth_1.signUpUser);
// POST Sign In Users
authRouter.post("/auth/signin", auth_1.signInUser);
// PATCH Update profile
authRouter.patch("/auth", auth_jwt_1.verifyToken, auth_1.updateUser);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map