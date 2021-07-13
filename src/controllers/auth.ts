import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { IUser } from "../types/auth";

// POST "/auth/signup"
export const signUpUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { type_user, full_name, email, password, languages, birthday, province, city } =
    req.body;

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
    };
    const newUser: IUser = await new User(user).save();
    return res
      .status(201)
      .json({ message: "User registered", user: newUser, status_code: 201 });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: error.message, status_code: 500 });
  }
};

// POST "/auth/signin"
export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  const { password, email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const result: boolean = await bcrypt.compare(password, user.password)
      !result ? 
        res.status(500).json({ message: "Wrong password"}) :
        res.status(200).json({ message: "Logged", user: user })
    } else {
      throw new Error("Wrong email, user not found.")
    }
    
  } catch (error) {
      return res.status(500).json({ message: error.message })
  }

}
