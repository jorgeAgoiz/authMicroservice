import express from "express";
import { signUpUser, signInUser } from '../controllers/auth';

const authRouter = express.Router();

// POST Sign Up Users
authRouter.post("/auth/signup", signUpUser);

// POST Sign In Users
authRouter.post("/auth/signin", signInUser);

export default authRouter;
