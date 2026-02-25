// routes/user.routes.js

const router = require("express").Router();

const { authenticate } = require("../middleware/auth.middleware");
const { authorize } = require("../middleware/rbac.middleware");

const userController = require("../controllers/user.controller");

router.post("/instructor", authenticate, authorize("ADMIN"), userController.createInstructor);

router.patch("/approve/:id", authenticate, authorize("ADMIN"), userController.approveStudent);

router.get("/", authenticate, authorize("ADMIN","INSTRUCTOR"), userController.getUsers);

router.delete("/:id", authenticate, authorize("ADMIN"), userController.deleteUser);

module.exports = router;    