// routes/course.routes.js

const router = require("express").Router();
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/rbac.middleware");
const courseController = require("../controllers/course.controller");

// Create course → Instructor only
router.post("/", authenticate, authorize("INSTRUCTOR"), courseController.createCourse);

// Get courses (pagination + search)
router.get("/", authenticate, courseController.getCourses);

module.exports = router;