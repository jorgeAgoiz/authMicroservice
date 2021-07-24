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
describe.skip("Testing GET Route", () => {
    test.skip("Give me all teachers", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .get("/auth/teacher")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjQ0Y2ZlNDc0NGI5Mjg5NDY1N2FjZiIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjc2NDQ5NSwiZXhwIjoxNjI2NzcxNjk1fQ.tKY3Csu-nEZCZszrecLNy0QX64XbKayGNqR-gdaY6WU")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(Array.isArray(result.body.users)).toBe(true);
        expect(result.body.status_code).toBe(200);
        expect(result.body.users).toHaveLength(1);
    }));
    test.skip("Give me all students", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .get("/auth/student")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjQ0Y2ZlNDc0NGI5Mjg5NDY1N2FjZiIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjc2NDQ5NSwiZXhwIjoxNjI2NzcxNjk1fQ.tKY3Csu-nEZCZszrecLNy0QX64XbKayGNqR-gdaY6WU")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(Array.isArray(result.body.users)).toBe(true);
        expect(result.body.status_code).toBe(200);
        expect(result.body.users).toHaveLength(1);
    }));
    test.skip("Give me a specific teacher", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .get("/auth/teacher")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjY4ZTYxM2NjMzE5NTdmNGY0MDQyZSIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjc3MjkwOSwiZXhwIjoxNjI2NzgwMTA5fQ.wGAO3sqf6URdu5MVifbPgs2zrXDWRMj2MFi6j-z9GKI")
            .query({ id: "60f44cfe4744b92894657acf" })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(result.body.user).toHaveProperty("email", "jorgeagoiz@gmail.com");
    }));
    test.skip("Request without token, I expect to recieve an error.", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .get("/auth/student")
            .expect(403)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("Token not found");
    }));
});
//# sourceMappingURL=gets.test.js.map