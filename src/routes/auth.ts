import express from "express";
import { Teacher, Client, Days } from "../types/auth";

const authRouter = express.Router();

// POST Sign Up
authRouter.post("/auth/signup", (req, res) => {
  const yomismo: Teacher = {
    full_name: "Jorge",
    email: "loquesea@jiji.es",
    password: "1234",
    birthday: "06/12/1984",
    languages: ["español", "ingles", "aleman"],
    province: "Madrid",
    city: "Pinto",
    availability: [
      { nameDay: Days.Lunes, available_hours: [9, 10, 11, 12] },
      { nameDay: Days.Martes, available_hours: [16, 17, 18, 19] },
    ],
  };

  res.send(yomismo);
});

export default authRouter;
