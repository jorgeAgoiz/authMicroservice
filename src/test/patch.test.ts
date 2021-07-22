import { app } from "../index";
import supertest from "supertest";
const api = supertest(app);

describe("Testing PATCH Route to Update Profile", () => {
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
    userId: "60f91817941f0d3be43ed757",
    birthday: "Lo Que Sea",
    province: "Navarra",
    city: "Tudela",
  };

  test.skip("Update profile correctly, I expect 201 status code", async () => {
    const result = await api
      .patch("/auth")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJaYXJhZ296YSIsImlhdCI6MTYyNjk2MjEwMSwiZXhwIjoxNjI2OTY5MzAxfQ.BlCn8GZGa7BiAdbqk_GExbwAogJKij6HVsaAph0OSp0"
      )
      .send(updateProfile)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("User updated");
  });

  test.skip("Update profile with a bussy email, I expect error message", async () => {
    const result = await api
      .patch("/auth")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJaYXJhZ296YSIsImlhdCI6MTYyNjk2MjEwMSwiZXhwIjoxNjI2OTY5MzAxfQ.BlCn8GZGa7BiAdbqk_GExbwAogJKij6HVsaAph0OSp0"
      )
      .send(updateEmailBussy)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe(
      `E11000 duplicate key error collection: app-idiomas.users index: email_1 dup key: { email: "${updateEmailBussy.email}" }`
    );
  });

  test("Update profile with an incorrect field, I expect error message", async () => {
    const result = await api
      .patch("/auth")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJaYXJhZ296YSIsImlhdCI6MTYyNjk2MjEwMSwiZXhwIjoxNjI2OTY5MzAxfQ.BlCn8GZGa7BiAdbqk_GExbwAogJKij6HVsaAph0OSp0"
      )
      .send(udpateInvalidField)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    console.log(result.body);
    /* expect(result.body.message).toBe(
      `E11000 duplicate key error collection: app-idiomas.users index: email_1 dup key: { email: "${updateEmailBussy.email}" }`
    ); */
  });
});
