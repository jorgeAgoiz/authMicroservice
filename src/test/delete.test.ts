import { app } from "../index";
import supertest from "supertest";
import User from "../models/user";
import { IUser } from "../types/auth";
const api = supertest(app);

describe("Testing delete users route", () => {
  test.skip("Delete user successfully", async () => {
    const result = await api
      .delete("/auth")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZmFjZjRlOTc0ZWI5MTAyNDIwNzQ4NCIsImNpdHkiOiJUdWRlbGEiLCJpYXQiOjE2MjcwNDk4MjQsImV4cCI6MTYyNzA1NzAyNH0.BNWRCnylU4e9YgAO-74jnSlesXZrutaL4Z0XuG1FDv0"
      )
      .set("Accept", "application/json")
      .send({ id: "60facf4e974eb91024207484" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    console.log(result.body);

    expect(result.body.message).toBe("User deleted successfully");
  });
});
