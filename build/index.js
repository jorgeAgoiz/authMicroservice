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
const rate_limiter_1 = require("./util/rate.limiter");
const connectionString = process.env.NODE_ENV === "test" ? env_vars_1.MONGODB_URI_TEST : env_vars_1.MONGODB_URI;
const app = express_1.default();
//Middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(compression_1.default());
app.use(rate_limiter_1.apiLimiter);
//Routes
app.use(auth_1.default);
mongoose_1.default
    .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then((result) => {
    app.listen(env_vars_1.PORT, () => {
        console.log(`Listening in port ${env_vars_1.PORT}....`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map