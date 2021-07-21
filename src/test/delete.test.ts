import { app } from "../index";
import supertest from "supertest";
import User from "../models/user";
import { IUser } from "../types/auth";
const api = supertest(app);

describe("Testing delete users route", () => {
  beforeAll(async () => {
    /* const newUser: Object = {
      type_user: "teacher",
      full_name: "Maria Navas",
      email: "mnavassanc@gmail.com",
      password: "12345",
      languages: ["Ingles", "Frances", "Aleman"],
      birthday: new Date("1986-08-28"),
      province: "Madrid",
      city: "Pinto",
    };

    const user: IUser = await new User(newUser).save(); */
  });

  test("Delete user successfully", async () => {
    const result = await api
      .delete("/auth")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjY4ZTYxM2NjMzE5NTdmNGY0MDQyZSIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjg1OTQ5MSwiZXhwIjoxNjI2ODY2NjkxfQ.NFS0vqtA5lsIzPMlo9D3qBEpkhc6o-UeKme4hvDayDM"
      )
      .send({ id: "0f68e613cc31957f4f4042e" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("User deleted successfully");
  });
});
