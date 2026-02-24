// routes/auth.routes.js

const router = require("express").Router();
const authController = require("../controllers/auth.controller");

const { registerSchema } = require("../validations/auth.validation");

// Register student
router.post("/register", authController.register);

// Login
router.post("/login", authController.login);

module.exports = router;