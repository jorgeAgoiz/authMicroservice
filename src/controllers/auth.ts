import { NextFunction, Request, RequestHandler, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { IUser, IPicture, Reminder } from "../types/auth";
import jwt from "jsonwebtoken";
import { MAIL_NAME, SECRET } from "../util/env.vars";
import { transporter } from "../util/nodemailer.config";
import { ObjectId } from "mongodb";

const MAIL_USER = MAIL_NAME;

// POST "/auth/signup"
export const signUpUser: RequestHandler = async (req, res, next) => {
  const {
    type_user,
    full_name,
    email,
    password,
    languages,
    birthday,
    province,
    city,
  }: IUser = req.body;
  let profile_picture: string | undefined = "";
  if (req.file) {
    const pathName: IPicture = req.file;
    profile_picture = pathName.location;
  }

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
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

// POST "/auth/signin" ******* JWT Implementado
export const signInUser: RequestHandler = async (req, res, next) => {
  const { password, email }: { password: string; email: string } = req.body;
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
export const updateUser: RequestHandler = async (req, res, next) => {
  const {
    userId,
    full_name,
    email,
    birthday,
    province,
    city,
    languages,
    oldPassword,
  }: {
    userId: string;
    full_name: string;
    email: string;
    birthday: Date;
    province: string;
    city: string;
    languages: Array<string>;
    oldPassword: string;
  } = req.body;
  let { password }: { password: string } = req.body.password;
  let profile_picture: string | undefined = "";
  if (req.file) {
    const pathName: IPicture = req.file;
    profile_picture = pathName.location;
  }

  try {
    if (password && oldPassword && password === oldPassword) {
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
        omitUndefined: true, // Omite los undefined al modificar el registro
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
export const deleteUser: RequestHandler = async (req, res, next) => {
  const { id }: { id: string } = req.body; // ***** Check

  try {
    const userRemoved = await User.findOneAndDelete({ _id: id }).select({
      password: 0,
    });
    if (!userRemoved) {
      return res
        .status(404)
        .json({ message: "Error, user not found", status_code: 404 });
    }

    return res.status(200).json({
      message: "User deleted successfully",
      user: userRemoved,
      status_code: 200,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

//GET "/auth" ***** Para obtener los usuatios
export const getUsersOf: RequestHandler = async (req, res, next) => {
  const type_user: string = req.params.type_user;
  const id = (req.query as { id: string }).id;

  try {
    if (!id) {
      const listUsers: Array<IUser> = await User.find({ type_user });
      return res.status(200).json({ users: listUsers, status_code: 200 });
    }

    const specifiedUser: IUser | null = await User.findById(id);

    if (!specifiedUser) {
      return res
        .status(404)
        .json({ message: "This user does not exist", status_code: 404 });
    }
    return res.status(200).json({ user: specifiedUser, status_code: 200 });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

//POST "/auth/reset"
export const reminderPassword: RequestHandler = async (req, res, next) => {
  const { email, userId }: Reminder = req.body;

  try {
    const user: IUser | null = await User.findOne({ _id: userId, email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found.", status_code: 404 });
    }
    const mailSended = await transporter.sendMail({
      from: `"Clases Idiomas App" ${MAIL_USER}`,
      to: user.email,
      subject: "Resetea tu contraseña",
      html: `
    <h1>Resetear Contraseña</h1>
    <p>
    Haz click en el siguiente enlace para resetear tu contraseña: 
    ${"www.google.com"}
    </p>
    ` /****** AJUSTAR ENLACE Incluyendo el ID en la petición para el fronta*/,
    });
    return res.status(200).json({
      message: "Email sended, check your inbox",
      response: mailSended.response,
      status_code: 200,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

//PATCH "/auth/reset"
export const resetPassword: RequestHandler = async (req, res, next) => {
  const { id, newPassword }: { id: string; newPassword: string } = req.body;

  try {
    const user: IUser | null = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", status_code: 404 });
    }
    const salt: string = await bcrypt.genSalt(12);
    const newPassHashed: string = await bcrypt.hash(newPassword, salt);
    user.password = newPassHashed;
    await user.save();

    return res
      .status(200)
      .json({ message: "Password reseted", status_code: 200 });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};
