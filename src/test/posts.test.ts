import { app } from "../index";
import supertest from "supertest";
import User from "../models/user";
const api = supertest(app);

describe("Testing Create User POST", () => {
  // Antes de
  beforeAll(async () => {
    await User.deleteMany({});
  });

  test("Create user successfully", async () => {
    const newUser: Object = {
      type_user: "student",
      full_name: "Maria Navas",
      email: "mnavassanc@gmail.com",
      password: "12345",
      languages: ["Ingles", "Frances", "Aleman"],
      birthday: new Date("1986-08-28"),
      province: "Madrid",
      city: "Pinto",
    };
    const result = await api
      .post("/auth/signup")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("User registered");
  });
});
