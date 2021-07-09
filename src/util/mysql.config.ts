import { Sequelize } from "sequelize";
import { DBNAME, DBPASS, DBPORT, DBUSER } from "./env.vars";

const sequelize = new Sequelize(DBNAME, DBUSER, DBPASS, {
  dialect: "mysql",
  host: "localhost",
  port: DBPORT,
});

export default sequelize;
