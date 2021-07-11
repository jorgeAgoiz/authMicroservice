import express from "express";
import { signUpTeacher } from "../controllers/auth.teacher";

const authRouter = express.Router();

// POST Sign Up Teachers
authRouter.post("/auth/teacher/signup", signUpTeacher);

export default authRouter;
