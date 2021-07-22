import { app } from "../index";
import supertest from "supertest";
const api = supertest(app);

describe("Testing PATCH Route to Update Profile", () => {
  const updateProfile = {
    userId: "60f91817941f0d3be43ed757",
    birthday: "1992-02-18",
    province: "Argagon",
    city: "Zaragoza",
  };

  test.skip("Update profile correctly, I expect 201 status code", async () => {
    const result = await api
      .patch("/auth")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjkxODE3OTQxZjBkM2JlNDNlZDc1NyIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjkzNzM4MCwiZXhwIjoxNjI2OTQ0NTgwfQ.cuCsHOlIo1Pvp_J7UUdMAv0WtUJnwcdrfPq6qq3zxiQ"
      )
      .send(updateProfile)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("User updated");
  });
});
