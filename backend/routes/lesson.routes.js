// routes/lesson.routes.js

const router = require("express").Router();
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/rbac.middleware");
const lessonController = require("../controllers/lesson.controller");

// Create lesson
router.post(
  "/",
  authenticate,
  authorize("INSTRUCTOR"),
  lessonController.createLesson
);

// Attempt quiz → Student
router.post(
  "/attempt/:lessonId",
  authenticate,
  authorize("STUDENT"),
  lessonController.attemptQuiz
);

module.exports = router;