// routes/user.routes.js

const router = require("express").Router();
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/rbac.middleware");
const userController = require("../controllers/user.controller");

// Create instructor
router.post("/instructor", authenticate, authorize("ADMIN"), userController.createInstructor);

// Approve student
router.patch("/approve/:id", authenticate, authorize("ADMIN"), userController.approveStudent);

module.exports = router;