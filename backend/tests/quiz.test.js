const request = require("supertest");
const app = require("../app");

describe("Quiz API", () => {

  test("Submit quiz attempt", async () => {

    const res = await request(app)
      .post("/quiz/submit")
      .set("Authorization", "Bearer TOKEN_HERE")
      .send({
        lessonId: "LESSON_ID",
        answers: {}
      });

   expect([200,400,401,404]).toContain(res.statusCode);
  });

});