import express from "express";
import { PORT } from "./util/env.vars";
import sequelize from "./util/mysql.config";

const app = express();

sequelize
  //   .sync({ force: true })
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Listening in port ${PORT}....`);
    });
  })
  .catch((err) => console.log(err));
