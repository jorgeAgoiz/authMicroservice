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
const api = supertest_1.default(index_1.app);
describe.skip("Testing PATCH Route to Update Profile", () => {
    const updateProfile = {
        userId: "60f91817941f0d3be43ed757",
        birthday: "1992-02-18",
        province: "Aragon",
        city: "Zaragoza",
    };
    const updateEmailBussy = {
        userId: "60f91817941f0d3be43ed757",
        email: "mnavassanc@gmail.com",
    };
    const udpateInvalidField = {
        userId: "60f997aa59ca1a19d82c894d",
        birthday: "Lo Que Sea",
        province: "Navarra",
        city: "Tudela",
    };
    test.skip("Update profile correctly, I expect 201 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .patch("/auth")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJaYXJhZ296YSIsImlhdCI6MTYyNjk2MjEwMSwiZXhwIjoxNjI2OTY5MzAxfQ.BlCn8GZGa7BiAdbqk_GExbwAogJKij6HVsaAph0OSp0")
            .send(updateProfile)
            .expect(201)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("User updated");
    }));
    test.skip("Update profile with a bussy email, I expect error message", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .patch("/auth")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJaYXJhZ296YSIsImlhdCI6MTYyNjk2MjEwMSwiZXhwIjoxNjI2OTY5MzAxfQ.BlCn8GZGa7BiAdbqk_GExbwAogJKij6HVsaAph0OSp0")
            .send(updateEmailBussy)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe(`E11000 duplicate key error collection: app-idiomas.users index: email_1 dup key: { email: "${updateEmailBussy.email}" }`);
    }));
    test.skip("Update profile with an incorrect field, I expect error message", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .patch("/auth")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjk5N2FhNTljYTFhMTlkODJjODk0ZCIsImNpdHkiOiJ0dWRlbGEiLCJpYXQiOjE2MjcwMjg4NzQsImV4cCI6MTYyNzAzNjA3NH0.mJVqvrF8esRauBl9HSaBrGlKBkoQhl_boRmvL-NHjNM")
            .send(udpateInvalidField)
            .expect(400)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe('Cast to date failed for value "Lo Que Sea" (type string) at path "birthday"');
    }));
});
describe.skip("PATCH Route Reset Password", () => {
    test.skip("Reset password", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .patch("/auth/reset")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjk5N2FhNTljYTFhMTlkODJjODk0ZCIsImNpdHkiOiJ0dWRlbGEiLCJpYXQiOjE2MjcwNDcyMzUsImV4cCI6MTYyNzA1NDQzNX0.qOY55xSE8W71g-JiGqpAKpsgJGvb0hRnNHLw-R6EFRw")
            .send({ id: "60f997aa59ca1a19d82c894d", newPassword: "121212" })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("Password reseted");
    }));
    test.skip("Triying to reset password, but with wrong ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .patch("/auth/reset")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjk5N2FhNTljYTFhMTlkODJjODk0ZCIsImNpdHkiOiJ0dWRlbGEiLCJpYXQiOjE2MjcwNDcyMzUsImV4cCI6MTYyNzA1NDQzNX0.qOY55xSE8W71g-JiGqpAKpsgJGvb0hRnNHLw-R6EFRw")
            .send({ id: "60f997aa59ca1a19d82c8912", newPassword: "121212" })
            .expect(404)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("User not found");
    }));
});
//# sourceMappingURL=patch.test.js.map