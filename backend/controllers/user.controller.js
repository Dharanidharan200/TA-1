const bcrypt = require("bcrypt");
const { User } = require("../models");

// ADMIN → Create Instructor
exports.createInstructor = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const instructor = await User.create({
      email,
      password: hashed,
      role: "INSTRUCTOR",
      approved: true,
    });

    res.json({
      message: "Instructor created",
      instructor,
    });
  } catch (err) {
    next(err);
  }
};

// ADMIN → Approve Student
exports.approveStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    const student = await User.findByPk(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    student.approved = true;
    await student.save();

    res.json({
      message: "Student approved",
      student,
    });
  } catch (err) {
    next(err);
  }
};