import express from "express";
import { PORT, MONGODB_URI, MONGODB_URI_TEST } from "./util/env.vars";
import authRouter from "./routes/auth";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { apiLimiter } from "./util/rate.limiter";
import { corsOptions } from "./util/cors.config";
export const app = express();

const connectionString: string =
  process.env.NODE_ENV === "test" ? MONGODB_URI_TEST : MONGODB_URI;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(helmet());
app.use(compression());
app.use(apiLimiter);

//Routes
app.use(authRouter);

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listening in port ${PORT}....`);
    });
  })
  .catch((err) => console.log(err));
