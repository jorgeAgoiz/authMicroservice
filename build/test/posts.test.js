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
const index_1 = require("../index");
const supertest_1 = __importDefault(require("supertest"));
const user_1 = __importDefault(require("../models/user"));
const api = supertest_1.default(index_1.app);
describe("Testing Create User POST", () => {
    // Antes de
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield user_1.default.deleteMany({});
    }));
    test.skip("Create user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            type_user: "student",
            full_name: "Maria Navas",
            email: "mnavassanc@gmail.com",
            password: "12345",
            languages: ["Ingles", "Frances", "Aleman"],
            birthday: new Date("1986-08-28"),
            province: "Madrid",
            city: "Pinto",
        };
        const result = yield api
            .post("/auth/signup")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("User registered");
    }));
    test.skip("Try to create user without required files like full_name for example, I expect an 400 Error.", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            type_user: "student",
            email: "mnavassanc@gmail.com",
            password: "12345",
            languages: ["Ingles", "Frances", "Aleman"],
            birthday: new Date("1986-08-28"),
            province: "Madrid",
            city: "Pinto",
        };
        const result = yield api
            .post("/auth/signup")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("User validation failed: full_name: Path `full_name` is required.");
    }));
    test.skip("Try to create user with a bussy email, I expect an 400 Error.", () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            type_user: "student",
            full_name: "Maria Navas",
            email: "mnavassanc@gmail.com",
            password: "12345",
            languages: ["Ingles", "Frances", "Aleman"],
            birthday: new Date("1986-08-28"),
            province: "Madrid",
            city: "Pinto",
        };
        const result = yield api
            .post("/auth/signup")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe('E11000 duplicate key error collection: app-idiomas-test.users index: full_name_1 dup key: { full_name: "Maria Navas" }');
    }));
});
describe("Testing Log In Route POST", () => {
    const userForLogin = {
        email: "mnavassanc@gmail.com",
        password: "12345",
    };
    const incorrectPasssword = {
        email: "mnavassanc@gmail.com",
        password: "123456789",
    };
    const incorrectEmail = {
        email: "emailInvalido@gmail.com",
        password: "12345",
    };
    test.skip("LogIn successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .post("/auth/signin")
            .send(userForLogin)
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("Logged");
        expect(result.body.user_token).toBeTruthy();
        console.log(result.body.user_token);
    }));
    test.skip("Log In with incorrect password, I expect 401 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .post("/auth/signin")
            .send(incorrectPasssword)
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("Wrong password");
    }));
    test.skip("Log In with an incorrect email, I expect 401 status code.", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .post("/auth/signin")
            .send(incorrectEmail)
            .expect(401)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("Wrong email, user not found.");
    }));
});
describe.skip("Testing Send link to set a new password", () => {
    test("Send email to reset password and I expect a 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .post("/auth/reset")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjkzNzM4MCwiZXhwIjoxNjI2OTQ0NTgwfQ.cuCsHOlIo1Pvp_J7UUdMAv0WtUJnwcdrfPq6qq3zxiQ")
            .send({ email: "jorgeagoiz@gmail.com" })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("Email sended, check your inbox");
    }));
    test("Input an incorrect email to send an email, I expect 404 status code.", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .post("/auth/reset")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjkzNzM4MCwiZXhwIjoxNjI2OTQ0NTgwfQ.cuCsHOlIo1Pvp_J7UUdMAv0WtUJnwcdrfPq6qq3zxiQ")
            .send({ email: "jap@gmail.com" })
            .expect(404)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("User not found.");
    }));
});
//# sourceMappingURL=posts.test.js.map