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
    /* beforeAll(async () => {
      const newUser: Object = {
        type_user: "teacher",
        full_name: "Maria Navas",
        email: "mnavassanc@gmail.com",
        password: "12345",
        languages: ["Ingles", "Frances", "Aleman"],
        birthday: new Date("1986-08-28"),
        province: "Madrid",
        city: "Pinto",
      };
  
      const user: IUser = await new User(newUser).save();
    }); */
    test.skip("Delete user successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield api
            .delete("/auth")
            .set("Authorization", "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjgxNzY0OTBlNDE1MDY2ODU3YzBiNSIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjg3MTY2OSwiZXhwIjoxNjI2ODc4ODY5fQ.ZVUx1BmVl2ckfA2KZ4_zYXb_tIpGkZwuD6ybbH3TKy0")
            .set("Accept", "application/json")
            .send({ id: "60f8176490e415066857c0b5" })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(result.body.message).toBe("User deleted successfully");
    }));
});
//# sourceMappingURL=delete.test.js.map