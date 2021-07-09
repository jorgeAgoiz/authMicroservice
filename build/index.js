"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var env_vars_1 = require("./util/env.vars");
var mysql_config_1 = __importDefault(require("./util/mysql.config"));
var app = express_1.default();
mysql_config_1.default
    //   .sync({ force: true })
    .sync()
    .then(function (result) {
    app.listen(env_vars_1.PORT, function () {
        console.log("Listening in port " + env_vars_1.PORT + "....");
    });
})
    .catch(function (err) { return console.log(err); });
