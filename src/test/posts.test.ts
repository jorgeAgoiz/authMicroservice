import { app } from "../index";
import supertest from "supertest";
import User from "../models/user";
const api = supertest(app);

describe.skip("Testing Create User POST", () => {
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

describe.skip("Testing Log In Route POST", () => {
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

  test.skip("LogIn successfully", async () => {
    const result = await api
      .post("/auth/signin")
      .send(userForLogin)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("Logged");
    expect(result.body.user_token).toBeTruthy();

    console.log(result.body.user_token);
  });

  test.skip("Log In with incorrect password, I expect 401 status code", async () => {
    const result = await api
      .post("/auth/signin")
      .send(incorrectPasssword)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("Wrong password");
  });

  test.skip("Log In with an incorrect email, I expect 401 status code.", async () => {
    const result = await api
      .post("/auth/signin")
      .send(incorrectEmail)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("Wrong email, user not found.");
  });
});

describe.skip("Testing Send link to set a new password", () => {
  test.skip("Send email to reset password and I expect a 200 status code", async () => {
    const result = await api
      .post("/auth/reset")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjkzNzM4MCwiZXhwIjoxNjI2OTQ0NTgwfQ.cuCsHOlIo1Pvp_J7UUdMAv0WtUJnwcdrfPq6qq3zxiQ"
      )
      .send({ email: "jorgeagoiz@gmail.com" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("Email sended, check your inbox");
  });

  test.skip("Input an incorrect email to send an email, I expect 404 status code.", async () => {
    const result = await api
      .post("/auth/reset")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjkzNzM4MCwiZXhwIjoxNjI2OTQ0NTgwfQ.cuCsHOlIo1Pvp_J7UUdMAv0WtUJnwcdrfPq6qq3zxiQ"
      )
      .send({ email: "jap@gmail.com" })
      .expect(404)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("User not found.");
  });
});
