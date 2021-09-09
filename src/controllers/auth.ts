import { RequestHandler } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { IUser, IPicture, Reminder, FilterGet, Verify } from "../types/auth";
import jwt from "jsonwebtoken";
import { MAIL_NAME, SECRET } from "../util/env.vars";
import { transporter } from "../util/nodemailer.config";

const MAIL_USER = MAIL_NAME;

// POST "/auth/signup"
/* send => type_user, full_name, email, password, languages, birthday, province, city, profile_picture */
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
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

// PATCH "/auth/profile_pic"
/* Send => token, userId and image */
export const uploadProfilePic: RequestHandler = async (req, res, next) => {
  const { userId }: { userId: string } = req.body;
  let profile_picture: string | undefined = "";
  if (req.file) {
    const pathName: IPicture = req.file;
    profile_picture = pathName.location;
  }

  try {
    const newUserPic: IUser | null = await User.findByIdAndUpdate(
      userId,
      { profile_picture },
      {
        new: true,
        omitUndefined: true, // Omite los undefined al modificar el registro
      }
    ).select({ password: 0 });

    if (!newUserPic) {
      return res
        .status(404)
        .json({ message: "Error, user not found", status_code: 404 });
    }

    return res.status(201).json({
      message: "Profile picture updated",
      user: newUserPic,
      status_code: 201,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

// POST "/auth/signin"
/* Send => password, email, and you recieved a token */
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
          { id: user._id, type_user: user.type_user, city: user.city },
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
/* Send => id, email, full_name, birthday, province, city, languages, oldpassword , profile_picture, token */
export const updateUser: RequestHandler = async (req, res, next) => {
  const {
    userId,
    full_name,
    email,
    birthday,
    province,
    city,
    languages,
  }: {
    userId: string;
    full_name: string;
    email: string;
    birthday: Date;
    province: string;
    city: string;
    languages: Array<string>;
  } = req.body;

  try {
    const updateUser = {
      full_name,
      email,
      birthday,
      province,
      city,
      languages,
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
/* Send => id, token */
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
/* Send => type_user, id || city || province, token */
export const getUsersOf: RequestHandler = async (req, res, next) => {
  const type_user: string = req.params.type_user;
  const id = (req.query as { id: string }).id;
  const province = (req.query as { province: string }).province;
  const city = (req.query as { city: string }).city;
  const language = (req.query as { language: string }).language;
  let filterQuery: FilterGet = {
    type_user,
  };

  try {
    if (!id) {
      if (province) filterQuery.province = province;
      if (city) filterQuery.city = city;
      if (language) filterQuery.languages = language;

      const listUsers: Array<IUser> = await User.find(filterQuery, {
        password: 0,
      });
      if (listUsers.length < 1) {
        return res
          .status(404)
          .json({ message: "No users found", status_code: 404 });
      }

      return res.status(200).json({ users: listUsers, status_code: 200 });
    }

    const specifiedUser: IUser | null = await User.findById(id).select({
      password: 0,
    });
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
/* Send => id, email, token */
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
/* Send => id, newpassword */
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

//POST "/user/verify"
/* Send ==> full_name, email 
Just to verify if this user exists in the front-end */
export const verifyNewUser: RequestHandler = async (req, res, next) => {
  const { full_name, email }: Verify = req.body;

  try {
    const nameBusy: IUser | null = await User.findOne({ full_name });
    const emailBusy: IUser | null = await User.findOne({ email });

    if (!nameBusy && !emailBusy) {
      return res
        .status(200)
        .json({ field: "any", busy: false, status_code: 200 });
    } else if (nameBusy) {
      return res
        .status(200)
        .json({ field: "full_name", busy: true, status_code: 200 });
    } else if (emailBusy) {
      return res
        .status(200)
        .json({ field: "email", busy: true, status_code: 200 });
    }
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};

//PATCH "/auth/password"
/* Send ==> userId, password, oldPassword 
To change the password */
export const changePassword: RequestHandler = async (req, res, next) => {
  let {
    userId,
    password,
    oldPassword,
  }: {
    userId: string | undefined;
    password: string | undefined;
    oldPassword: string | undefined;
  } = req.body;
  try {
    if (!password || !oldPassword) {
      return res
        .status(400)
        .json({ message: "Error, incomplete data.", status_code: 400 });
    }

    const verifyUserExists: IUser | null = await User.findById(userId);
    if (!verifyUserExists) {
      return res
        .status(400)
        .json({ message: "Error, user not found.", status_code: 400 });
    }
    const validPass: boolean = await bcrypt.compare(
      oldPassword,
      verifyUserExists.password
    );
    if (!validPass) {
      return res
        .status(400)
        .json({ message: "Error, not valid password", status_code: 400 });
    }

    const salt: string = await bcrypt.genSalt(12);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    password = hashedPassword;
    const newPasswordUser: IUser | null = await User.findByIdAndUpdate(
      userId,
      { password },
      {
        new: true,
        omitUndefined: true, // Omite los undefined al modificar el registro
      }
    ).select({ password: 0 });

    if (!newPasswordUser) {
      return res
        .status(404)
        .json({ message: "Error, user not found", status_code: 404 });
    }
    return res.status(201).json({
      message: "Password updated",
      user: newPasswordUser,
      status_code: 201,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message, status_code: 400 });
  }
};
