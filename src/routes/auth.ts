import express from "express";
import {
  signUpUser,
  signInUser,
  updateUser,
  deleteUser,
  getUsersOf,
} from "../controllers/auth";
import { verifyToken } from "../middlewares/auth.jwt";
import { goUpload } from "../middlewares/images.s3";

const authRouter = express.Router();

// POST Sign Up Users
authRouter.post("/auth/signup", goUpload, signUpUser);

// POST Sign In Users
authRouter.post("/auth/signin", signInUser);

// PATCH Update profile
authRouter.patch("/auth", [verifyToken, goUpload], updateUser);

// DELETE Delete User
authRouter.delete("/auth", verifyToken, deleteUser);

// GET Get users of
authRouter.get("/auth/:type_user", verifyToken, getUsersOf);

export default authRouter;
