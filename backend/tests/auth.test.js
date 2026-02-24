const request = require("supertest");
const app = require("../app");

describe("Auth API", () => {
  test("Register User", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        email: "test1@test.com",
        password: "123456",
      });

    expect(res.statusCode).toBe(200);
  });
});