import { app } from "../index";
import supertest from "supertest";
import User from "../models/user";
const api = supertest(app);

describe("Testing Create User POST", () => {
  // Antes de
  beforeAll(async () => {
    await User.deleteMany({});
  });

  test.skip("Create user successfully", async () => {
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

  test.skip("Try to create user without required files like full_name for example, I expect an 400 Error.", async () => {
    const newUser: Object = {
      type_user: "student",
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
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe(
      "User validation failed: full_name: Path `full_name` is required."
    );
  });

  test.skip("Try to create user with a bussy email, I expect an 400 Error.", async () => {
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
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe(
      'E11000 duplicate key error collection: app-idiomas-test.users index: full_name_1 dup key: { full_name: "Maria Navas" }'
    );
  });
});

describe("Testing Log In Route POST", () => {
  const userForLogin = {
    email: "mnavassanc@gmail.com",
    password: "12345",
  };

  test("LogIn successfully", async () => {
    const result = await api
      .post("/auth/signin")
      .send(userForLogin)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("Logged");
    expect(result.body.user_token).toBeTruthy();
  });
});
