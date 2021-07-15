import express from "express";
import { signUpUser, signInUser, updateUser, deleteUser } from '../controllers/auth';
import { verifyToken } from "../middlewares/auth.jwt";

const authRouter = express.Router();

// POST Sign Up Users
authRouter.post("/auth/signup", signUpUser);

// POST Sign In Users
authRouter.post("/auth/signin", signInUser);

// PATCH Update profile
authRouter.patch("/auth", verifyToken, updateUser);

// DELETE Delete User
authRouter.delete("/auth", verifyToken, deleteUser)

export default authRouter;
