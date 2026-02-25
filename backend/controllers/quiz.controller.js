const {
  Quiz,
  QuizQuestion,
  QuizAssignment,
  QuizAttempt,
  Course
} = require("../models");


exports.createQuiz = async (req, res) => {
  try {
    const { title, courseId } =
      req.body;

    const quiz = await Quiz.create({
      title,
      courseId,
      instructorId: req.user.id,
    });

    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Quiz creation failed",
    });
  }
};


exports.getQuizzes = async (req, res) => {
  try {
    const { courseId } = req.query; // optional query parameter
    const instructorId = req.user.id;

    const whereClause = { instructorId };
    if (courseId) {
      whereClause.courseId = courseId; // filter by course if provided
    }

    const quizzes = await Quiz.findAll({ where: whereClause });

    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getQuizzesByCourse = async (req, res) => {
  const { courseId } =
    req.params;

  const quizzes =
    await Quiz.findAll({
      where: { courseId },
    });

  res.json(quizzes);
};


exports.createQuestion = async (req, res) => {
  const {
    quizId,
    question,
    optionA,
    optionB,
    optionC,
    optionD,
    correctAnswer,
  } = req.body;

  const q =
    await QuizQuestion.create({
      quizId,
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAnswer,
    });

  res.json(q);
};

exports.assignQuiz = async (
  req,
  res
) => {
  const { quizId, studentIds } =
    req.body;

  const data = studentIds.map(
    (id) => ({
      quizId,
      studentId: id,
    })
  );

  await QuizAssignment.bulkCreate(
    data
  );

  res.json({
    message: "Quiz assigned",
  });
};


exports.getAssignedQuizzes = async (req, res) => {
  try {
    const quizzes = await QuizAssignment.findAll({
      where: { studentId: req.user.id },
      include: [
        {
          model: Quiz,
          as: 'quiz',
          attributes: ['id', 'title'],
          include: [
            {
              model: Course,
              as: 'course', // now matches the association
              attributes: ['id', 'title', 'description'],
            }
          ],
        },
      ],
    });

    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.submitQuiz = async (
  req,
  res
) => {
  const { quizId, answers } =
    req.body;

  const questions =
    await QuizQuestion.findAll({
      where: { quizId },
    });

  let score = 0;

  questions.forEach((q) => {
    if (
      answers[q.id] ===
      q.correctAnswer
    ) {
      score++;
    }
  });

  await QuizAttempt.create({
    quizId,
    studentId: req.user.id,
    score,
  });

  res.json({
    score,
    total: questions.length,
  });
};

exports.getQuestionsByQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    let attributes = ["id", "question", "createdAt", "updatedAt", "optionA", "optionB", "optionC", "optionD"];
    const userRole = req.query.role || req.body.role || "STUDENT";
    // If the user is an instructor, include the 'answer' column
    if (userRole === "INSTRUCTOR") {
      attributes.push("correctAnswer");
    }
    const questions = await QuizQuestion.findAll({
      where: { quizId },
      attributes,
      order: [["createdAt", "DESC"]],
    });


    res.json(questions);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch questions",
    });
  }
};

// POST /quiz/start
exports.startQuiz = async (req, res) => {
  try {
    const { userId, quizId } = req.body;

    // Try to find an existing attempt for this user + quiz
    let attempt = await QuizAttempt.findOne({
      where: { studentId: userId, quizId },
    });

    if (attempt) {
      // If it exists, increment the counter
      attempt.attemptCount = (attempt.attemptCount || 1) + 1;
      await attempt.save();
    } else {
      // If it doesn't exist, create a new record with attemptCount = 1
      attempt = await QuizAttempt.create({
        studentId: userId,
        quizId,
        attemptCount: 1,
      });
    }

    res.json({ message: "Quiz started", attempts: attempt.attemptCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to start quiz" });
  }
};