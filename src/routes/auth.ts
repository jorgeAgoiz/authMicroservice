import express from "express";
import {
  signUpUser,
  signInUser,
  updateUser,
  deleteUser,
} from "../controllers/auth";
import { verifyToken } from "../middlewares/auth.jwt";
import { uploadS3 } from "../middlewares/images.s3";
const upload = uploadS3.single("image");

const authRouter = express.Router();

// POST Sign Up Users
authRouter.post(
  "/auth/signup",
  function (req: any, res: any, next: any) {
    upload(req, res, function (err) {
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
