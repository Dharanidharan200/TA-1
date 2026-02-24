const request = require("supertest");
const app = require("../app");

describe("Course API", () => {

  test("Get Courses", async () => {
    const res = await request(app)
      .get("/courses");

    expect([200,401]).toContain(res.statusCode);
  });

});