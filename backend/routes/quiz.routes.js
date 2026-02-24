// routes/quiz.routes.js

const router = require("express").Router();
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/rbac.middleware");
const quiz = require("../controllers/quiz.controller");

// Instructor creates questions
router.post(
  "/questions",
  authenticate,
  authorize("INSTRUCTOR"),
  quiz.createQuestion
);

// Student attempts quiz
router.post(
  "/attempt",
  authenticate,
  authorize("STUDENT"),
  quiz.submitQuiz
);

module.exports = router;