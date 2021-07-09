import express from "express";

const authRouter = express.Router();

// POST Sign Up
authRouter.post("/auth/signup", (req, res) => res.send("Hi everyone!!"));

export default authRouter;
