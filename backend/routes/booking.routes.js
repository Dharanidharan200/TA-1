// routes/booking.routes.js

const router = require("express").Router();
const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/rbac.middleware");
const bookingController = require("../controllers/booking.controller");

// Student booking request
router.post("/", authenticate, authorize("STUDENT"), bookingController.createBooking);

// Admin approve booking
router.patch("/approve/:id", authenticate, authorize("ADMIN"), bookingController.approveBooking);

// Get weekly calendar
router.get("/calendar", authenticate, bookingController.getCalendar);

router.get("/weekly", authenticate, bookingController.getWeeklyBookings);
module.exports = router;