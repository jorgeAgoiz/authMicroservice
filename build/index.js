"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_vars_1 = require("./util/env.vars");
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const app = express_1.default();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(compression_1.default());
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