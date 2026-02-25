const router =
  require("express").Router();

const quiz =
  require("../controllers/quiz.controller");

const {
  authenticate,
} = require("../middleware/auth.middleware");

const {
  authorize,
} = require("../middleware/rbac.middleware");

/* Instructor */
router.post("/", authenticate, authorize("INSTRUCTOR"), quiz.createQuiz);

router.get("/", authenticate, authorize("INSTRUCTOR"), quiz.getQuizzes);

router.get("/course/:courseId", authenticate, quiz.getQuizzesByCourse);

router.post("/questions", authenticate, authorize("INSTRUCTOR"), quiz.createQuestion);

router.post("/assign", authenticate, authorize("INSTRUCTOR"), quiz.assignQuiz);

/* Student */
router.get("/assigned", authenticate, authorize("STUDENT"), quiz.getAssignedQuizzes);

router.post("/attempt", authenticate, authorize("STUDENT"), quiz.submitQuiz);


router.get("/:quizId/questions", authenticate, authorize("INSTRUCTOR", "STUDENT"), quiz.getQuestionsByQuiz);


router.post("/quizCount", authenticate, authorize("INSTRUCTOR", "STUDENT"), quiz.startQuiz);

module.exports = router;