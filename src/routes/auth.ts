import express from "express";
import {
  signUpUser,
  signInUser,
  updateUser,
  deleteUser,
  getUsersOf,
  reminderPassword,
} from "../controllers/auth";
import { verifyToken } from "../middlewares/auth.jwt";
import { goUpload } from "../middlewares/images.s3";
import {
  resetPassword,
  uploadProfilePic,
  verifyNewUser,
} from "../controllers/auth";

const authRouter = express.Router();

// POST Sign Up Users
authRouter.post("/auth/signup", signUpUser);

// PATCH Update Profile Pic
authRouter.patch(
  "/auth/profile_pic",
  [verifyToken, goUpload],
  uploadProfilePic
);

// POST Verify Bussy users
authRouter.post("/user/verify", verifyNewUser);

// POST Sign In Users
authRouter.post("/auth/signin", signInUser);

// PATCH Update profile
authRouter.patch("/auth", verifyToken, updateUser);

// DELETE Delete User
authRouter.delete("/auth", verifyToken, deleteUser);

// GET Get users of
authRouter.get("/auth/:type_user", verifyToken, getUsersOf);

// POST Send email to reset password
authRouter.post("/auth/reset", verifyToken, reminderPassword);

// PATCH Password reset
authRouter.patch("/auth/reset", resetPassword);

export default authRouter;
