const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models");

describe("Booking API", () => {

  let studentToken;
  let instructorId;

  beforeEach(async () => {

    // Reset DB
    await sequelize.sync({ force: true });

    // Create Instructor
    const instructorRes = await request(app)
      .post("/auth/register")
      .send({
        email: "instructor@test.com",
        password: "123456",
      });

    instructorId = instructorRes.body.id;

    // Create Student
    await request(app)
      .post("/auth/register")
      .send({
        email: "student@test.com",
        password: "123456",
      });

    // Login Student
    const loginRes = await request(app)
      .post("/auth/login")
      .send({
        email: "student@test.com",
        password: "123456",
      });

    studentToken = loginRes.body.token;
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("Booking request", async () => {

    const res = await request(app)
      .post("/bookings")
      .set("Authorization", `Bearer ${studentToken}`)
      .send({
        instructorId,
        startTime: "2026-03-01T10:00:00Z",
        endTime: "2026-03-01T11:00:00Z",
      });

    // Expect success or conflict
    expect([201,400]).toContain(res.statusCode);
  });

});