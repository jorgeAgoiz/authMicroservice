"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const env_vars_1 = require("./env.vars");
const sequelize = new sequelize_1.Sequelize(env_vars_1.DBNAME, env_vars_1.DBUSER, env_vars_1.DBPASS, {
    dialect: "mysql",
    host: "localhost",
    port: env_vars_1.DBPORT,
});
exports.default = sequelize;
//# sourceMappingURL=mysql.config.js.map