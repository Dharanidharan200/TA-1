// controllers/quiz.controller.js

const { QuizQuestion, QuizAttempt } = require("../models");

exports.createQuestion = async (req, res, next) => {
  try {
    const question = await QuizQuestion.create(req.body);
    res.json(question);
  } catch (err) {
    next(err);
  }
};

exports.submitQuiz = async (req, res, next) => {
  try {
    const { lessonId, answers } = req.body;

    const questions = await QuizQuestion.findAll({
      where: { LessonId: lessonId },
    });

    let score = 0;
    const incorrect = [];

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      } else {
        incorrect.push({
          question: q.question,
          correct: q.correctAnswer,
        });
      }
    });

    await QuizAttempt.create({
      UserId: req.user.id,
      LessonId: lessonId,
      score,
    });

    res.json({
      score,
      total: questions.length,
      incorrect,
    });
  } catch (err) {
    next(err);
  }
};