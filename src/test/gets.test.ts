import { app } from "../index";
import supertest from "supertest";
const api = supertest(app);

describe("Testing GET Route", () => {
  test.skip("Give me all teachers", async (): Promise<void> => {
    const result = await api
      .get("/auth/teacher")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjQ0Y2ZlNDc0NGI5Mjg5NDY1N2FjZiIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjc2NDQ5NSwiZXhwIjoxNjI2NzcxNjk1fQ.tKY3Csu-nEZCZszrecLNy0QX64XbKayGNqR-gdaY6WU"
      )
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(Array.isArray(result.body.users)).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.users).toHaveLength(1);
  });

  test.skip("Give me all students", async () => {
    const result = await api
      .get("/auth/student")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjQ0Y2ZlNDc0NGI5Mjg5NDY1N2FjZiIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjc2NDQ5NSwiZXhwIjoxNjI2NzcxNjk1fQ.tKY3Csu-nEZCZszrecLNy0QX64XbKayGNqR-gdaY6WU"
      )
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(Array.isArray(result.body.users)).toBe(true);
    expect(result.body.status_code).toBe(200);
    expect(result.body.users).toHaveLength(1);
  });

  test.skip("Give me a specific teacher", async () => {
    const result = await api
      .get("/auth/teacher")
      .set(
        "Authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjY4ZTYxM2NjMzE5NTdmNGY0MDQyZSIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjc3MjkwOSwiZXhwIjoxNjI2NzgwMTA5fQ.wGAO3sqf6URdu5MVifbPgs2zrXDWRMj2MFi6j-z9GKI"
      )
      .query({ id: "60f44cfe4744b92894657acf" })
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body.user).toHaveProperty("email", "jorgeagoiz@gmail.com");
  });

  test.skip("Request without token, I expect to recieve an error.", async () => {
    const result = await api
      .get("/auth/student")
      .expect(403)
      .expect("Content-Type", /application\/json/);

    expect(result.body.message).toBe("Token not found");
  });
});
