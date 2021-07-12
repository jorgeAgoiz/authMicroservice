"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_teacher_1 = require("../controllers/auth.teacher");
const authRouter = express_1.default.Router();
// POST Sign Up Teachers
authRouter.post("/auth/teacher/signup", auth_teacher_1.signUpTeacher);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map