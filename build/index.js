"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_vars_1 = require("./util/env.vars");
const mysql_config_1 = __importDefault(require("./util/mysql.config"));
const app = express_1.default();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
mysql_config_1.default
    //   .sync({ force: true })
    .sync()
    .then((result) => {
    app.listen(env_vars_1.PORT, () => {
        console.log(`Listening in port ${env_vars_1.PORT}....`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map