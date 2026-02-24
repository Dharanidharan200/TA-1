const router = require("express").Router();
const { addAvailability, getInstructorAvailability } = require("../controllers/availability.controller");

const { authenticate, } = require("../middleware/auth.middleware");

const { authorize, } = require("../middleware/rbac.middleware");

// Instructor only
router.post("/", authenticate, authorize("INSTRUCTOR"), addAvailability);

router.get("/:instructorId", authenticate, getInstructorAvailability);

module.exports = router;