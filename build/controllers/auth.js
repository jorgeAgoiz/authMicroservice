"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.signInUser = exports.signUpUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_vars_1 = require("../util/env.vars");
// POST "/auth/signup"
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type_user, full_name, email, password, languages, birthday, province, city, profile_picture, } = req.body;
    try {
        const salt = yield bcrypt_1.default.genSalt(12);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const user = {
            type_user,
            full_name,
            email,
            password: hashedPassword,
            languages,
            birthday,
            province,
            city,
            profile_picture,
        };
        const newUser = yield new user_1.default(user).save();
        return res
            .status(201)
            .json({ message: "User registered", user: newUser, status_code: 201 });
    }
    catch (error) {
        return res.status(400).json({ message: error.message, status_code: 500 });
    }
});
exports.signUpUser = signUpUser;
// POST "/auth/signin" ******* JWT Implementado
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (user) {
            const validPass = yield bcrypt_1.default.compare(password, user.password);
            if (!validPass) {
                return res.status(401).json({ message: "Wrong password" });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ id: user._id, city: user.city }, env_vars_1.SECRET, {
                    expiresIn: 7200,
                });
                return res.status(200).json({ message: "Logged", user_token: token });
            }
        }
        else {
            return res.status(401).json({ message: "Wrong email, user not found." });
        }
    }
    catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
exports.signInUser = signInUser;
//PATCH "/auth" ***** Para actualizar perfil de usuario
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
});
exports.updateUser = updateUser;
//DELETE "/auth" ***** Para eliminar usuario
//# sourceMappingURL=auth.js.map