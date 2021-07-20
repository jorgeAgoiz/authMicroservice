import {app} from "../index";
import supertest from "supertest";
const api = supertest(app);

describe("Testing GET Routes", () => {
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
  });
});
