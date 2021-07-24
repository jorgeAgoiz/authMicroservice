import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { SECRET } from "../util/env.vars";
import User from "../models/user";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization: string | undefined = req.headers["authorization"];

    if (!authorization) {
      return res
        .status(403)
        .json({ message: "Token not found", status_code: 403 });
    }
    if (!authorization.toLowerCase().startsWith("bearer")) {
      return res
        .status(401)
        .json({ message: "Invalid Token", status_code: 401 });
    }

    const token: string = authorization.substring(7);
    const decoded: any = jwt.verify(token, SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status_code: 404 });
    }
    req.body.userId = decoded.id;
    next();
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};
