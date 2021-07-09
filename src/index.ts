import express from "express";
import { PORT } from "./util/env.vars";
import sequelize from "./util/mysql.config";
import authRouter from "./routes/auth";

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use(authRouter);

sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listening in port ${PORT}....`);
    });
  })
  .catch((err) => console.log(err));
