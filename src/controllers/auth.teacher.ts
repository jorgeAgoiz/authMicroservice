import { NextFunction, Request, Response } from "express";
import Teacher from "../models/teacher";
import bcrypt from "bcrypt";
import { ITeacher } from "../types/auth";

// POST "/auth/teacher/signup"
export const signUpTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { full_name, email, password, languages, birthday, province, city } =
    req.body;

  try {
    const salt: string = await bcrypt.genSalt(12);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    const yoMismo: object = {
      full_name,
      email,
      password: hashedPassword,
      languages,
      birthday,
      province,
      city,
    };
    const newUser: ITeacher = await new Teacher(yoMismo).save();
    return res
      .status(201)
      .json({ message: "User created!!", user: newUser, status_code: 201 });
  } catch (error: any) {
    return res.status(500).json({ message: error.message, status_code: 500 });
  }
};
