// routes/module.routes.js

const router = require("express").Router();
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/rbac.middleware");
const moduleController = require("../controllers/module.controller");

// Add module → Instructor
router.post("/", authenticate, authorize("INSTRUCTOR"), moduleController.createModule);

module.exports = router;