import supertest from "supertest"
import {app} from '../index';
const api = supertest(app);

describe("Testing GET Routes", () => {
  
  test("Give me all teachers", async (): Promise<void> => {
    const result = await api.get("/auth/teacher")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjQ0Y2ZlNDc0NGI5Mjg5NDY1N2FjZiIsImNpdHkiOiJQaW50byIsImlhdCI6MTYyNjcwNzA1NiwiZXhwIjoxNjI2NzE0MjU2fQ.sgLttIH_X83EeKawYLdNV7ZePK7ThpgpyDFHiNqFEDo')
      .expect(200)
      .expect('Content-Type', /application\/json/)
       expect(Array.isArray(result.body.users)).toBe(true)
  });
})


