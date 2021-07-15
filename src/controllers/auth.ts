import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { IUser } from "../types/auth";
import jwt from "jsonwebtoken";
import { SECRET } from "../util/env.vars";

// POST "/auth/signup"
export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    type_user,
    full_name,
    email,
    password,
    languages,
    birthday,
    province,
    city,
    profile_picture,
  } = req.body;

  try {
    const salt: string = await bcrypt.genSalt(12);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const user = {
      type_user,
      full_name,
      email,
      password: hashedPassword,
      languages,
      birthday,
      province,
      city,
      profile_picture,
    };
    const newUser: IUser = await new User(user).save();
    return res
      .status(201)
      .json({ message: "User registered", user: newUser, status_code: 201 });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 500 });
  }
};

// POST "/auth/signin" ******* JWT Implementado
export const signInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const validPass: boolean = await bcrypt.compare(password, user.password);

      if (!validPass) {
        return res
          .status(401)
          .json({ message: "Wrong password", status_code: 401 });
      } else {
        const token: string = jwt.sign(
          { id: user._id, city: user.city },
          SECRET,
          {
            expiresIn: 7200,
          }
        );
        return res
          .status(200)
          .json({ message: "Logged", user_token: token, status_code: 200 });
      }
    } else {
      return res
        .status(401)
        .json({ message: "Wrong email, user not found.", status_code: 401 });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

//PATCH "/auth" ***** Para actualizar perfil de usuario
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    userId,
    full_name,
    email,
    birthday,
    province,
    city,
    profile_picture,
    languages,
  } = req.body;
  let password = req.body.password;

  try {
    if (password) {
      const salt: string = await bcrypt.genSalt(12);
      const hashedPassword: string = await bcrypt.hash(password, salt);
      password = hashedPassword;
    }
    const updateUser = {
      full_name,
      email,
      birthday,
      province,
      city,
      profile_picture,
      languages,
      password,
    };
    const newUserProfile: IUser | null = await User.findByIdAndUpdate(
      userId,
      updateUser,
      {
        new: true,
        omitUndefined: true
      }
    ).select({ password: 0 });
    if (!newUserProfile) {
      return res
        .status(404)
        .json({ message: "Error, user not found", status_code: 404 });
    }

    return res.status(201).json({
      message: "User updated",
      user: newUserProfile,
      status_code: 201,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

//DELETE "/auth" ***** Para eliminar usuario
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.body;

  try {
    const userRemoved = await User.findByIdAndDelete(id).select({ password: 0 });
    if (!userRemoved) {
      return res.status(404).json({ message: "Error, user not found", status_code: 404})
    }

    return res.status(200).json({ message: "User deleted successfully", user: userRemoved, status_code: 200 });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400})
  }
}
//GET "/auth" ***** Para obtener los usuatios

