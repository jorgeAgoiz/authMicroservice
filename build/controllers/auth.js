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
exports.signInUser = exports.signUpUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// POST "/auth/signup"
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { type_user, full_name, email, password, languages, birthday, province, city, } = req.body;
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
// POST "/auth/signin"
const signInUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (user) {
            const result = yield bcrypt_1.default.compare(password, user.password);
            !result
                ? res.status(401).json({ message: "Wrong password" })
                : res.status(200).json({ message: "Logged", user: user });
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
//# sourceMappingURL=auth.js.map