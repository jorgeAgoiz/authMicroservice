import { app } from "../index";
import supertest from "supertest";
import User from "../models/user";
import { IUser } from "../types/auth";
const api = supertest(app);

describe.skip("Testing delete users route", () => {
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

  test.skip("Delete user successfully", async () => {
    const result = await api
      .delete("/auth")
      .set(
        "Authorization",
        "Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjgxNzY0OTBlNDE1MDY2ODU3YzBiNSIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjg3MTY2OSwiZXhwIjoxNjI2ODc4ODY5fQ.ZVUx1BmVl2ckfA2KZ4_zYXb_tIpGkZwuD6ybbH3TKy0"
      )
      .set("Accept", "application/json")
      .send({ id: "60f8176490e415066857c0b5" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("User deleted successfully");
  });
});
