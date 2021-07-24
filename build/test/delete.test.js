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
describe("Testing delete users route", () => {
    test.skip("Delete user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .delete("/auth")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZmFjZjRlOTc0ZWI5MTAyNDIwNzQ4NCIsImNpdHkiOiJUdWRlbGEiLCJpYXQiOjE2MjcwNDk4MjQsImV4cCI6MTYyNzA1NzAyNH0.BNWRCnylU4e9YgAO-74jnSlesXZrutaL4Z0XuG1FDv0")
            .set("Accept", "application/json")
            .send({ id: "60facf4e974eb91024207484" })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        console.log(result.body);
        expect(result.body.message).toBe("User deleted successfully");
    }));
});
//# sourceMappingURL=delete.test.js.map