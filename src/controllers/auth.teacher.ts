import { NextFunction, Request, Response } from "express";
import Teacher from "../models/teacher";

// POST "/auth/teacher/signup"
export const signUpTeacher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const yoMismo = req.body;
  const result = await new Teacher(yoMismo).save();
  res.send(result);
};
