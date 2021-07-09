"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = require("sequelize");
var env_vars_1 = require("./env.vars");
var sequelize = new sequelize_1.Sequelize(env_vars_1.DBNAME, env_vars_1.DBUSER, env_vars_1.DBPASS, {
    dialect: "mysql",
    host: "localhost",
    port: env_vars_1.DBPORT,
});
exports.default = sequelize;
