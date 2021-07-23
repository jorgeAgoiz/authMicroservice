"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const env_vars_1 = require("./util/env.vars");
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const rate_limiter_1 = require("./util/rate.limiter");
exports.app = express_1.default();
const connectionString = process.env.NODE_ENV === "test" ? env_vars_1.MONGODB_URI_TEST : env_vars_1.MONGODB_URI;
//Middlewares
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use(cors_1.default());
exports.app.use(helmet_1.default());
exports.app.use(compression_1.default());
exports.app.use(rate_limiter_1.apiLimiter);
//Routes
exports.app.use(auth_1.default);
mongoose_1.default
    .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then((result) => {
    exports.app.listen(env_vars_1.PORT, () => {
        console.log(`Listening in port ${env_vars_1.PORT}....`);
    });
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map