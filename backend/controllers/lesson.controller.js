// controllers/lesson.controller.js

const { Lesson } = require("../models");

exports.createLesson = async (req, res, next) => {
  try {
    const { title, type, content, moduleId } = req.body;

    const lesson = await Lesson.create({
      title,
      type,
      content,
      moduleId,
    });

    res.status(201).json({
      message: "Lesson created",
      lesson,
    });
  } catch (err) {
    next(err);
  }
};

// Quiz attempt (basic skeleton)
exports.attemptQuiz = async (req, res, next) => {
  try {
    res.json({
      message: "Quiz attempt logic pending",
    });
  } catch (err) {
    next(err);
  }
};