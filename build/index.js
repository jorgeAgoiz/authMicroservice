"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_vars_1 = require("./util/env.vars");
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//Routes
app.use(auth_1.default);
mongoose_1.default
    .connect(env_vars_1.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
    app.listen(env_vars_1.PORT, () => {
        console.log(`Listening in port ${env_vars_1.PORT}....`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map