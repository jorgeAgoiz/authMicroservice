import express from "express";
import {
  signUpUser,
  signInUser,
  updateUser,
  deleteUser,
} from "../controllers/auth";
import { verifyToken } from "../middlewares/auth.jwt";
import multerS3Upload from "../middlewares/images.s3";
const upload = multerS3Upload.single("profile_picture");

const authRouter = express.Router();

// POST Sign Up Users
authRouter.post(
  "/auth/signup",
  function (req, res, next) {
    upload(req, res, function (err: any) {
      if (err) {
        return res.status(422).json({
          error: err,
        });
      }
      next();
    });
  },
  signUpUser
);

// POST Sign In Users
authRouter.post("/auth/signin", signInUser);

// PATCH Update profile
authRouter.patch("/auth", verifyToken, updateUser);

// DELETE Delete User
authRouter.delete("/auth", verifyToken, deleteUser);

export default authRouter;
