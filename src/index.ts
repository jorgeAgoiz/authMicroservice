import express from "express";
import { PORT, MONGODB_URI } from "./util/env.vars";
import authRouter from "./routes/auth";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(compression());

//Routes
app.use(authRouter);

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listening in port ${PORT}....`);
    });
  })
  .catch((err) => console.log(err));
