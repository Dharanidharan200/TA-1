const {
  Quiz,
  QuizQuestion,
  QuizAssignment,
  QuizAttempt,
  Course
} = require("../models");

const { Question } = require("../models");

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
exports.getQuizCount = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "UserId is required" });
    }

    const attempts = await QuizAttempt.findAll({
      where: { studentId: userId },
      include: [{
        model: Quiz,
        as: 'quiz', // make sure your association uses this alias
        attributes: ['title'],
      }],
    });

    // Convert into { quizId: { title, attemptCount } }
    const quizCounts = {};

    attempts.forEach((attempt) => {
      quizCounts[attempt.quizId] = {
        title: attempt.quiz?.title || "Unknown Quiz",
        attemptCount: attempt.attemptCount || 0,
      };
    });

    res.json(quizCounts); // ✅ returns object with title + count
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch quiz counts" });
  }
};


exports.startAttempt = async (req, res) => {
  try {
    const { userId, quizId } = req.body;

    let attempt = await QuizAttempt.findOne({
      where: { studentId: userId, quizId },
    });

    if (attempt) {
      attempt.attemptCount += 1;
      await attempt.save();
    } else {
      attempt = await QuizAttempt.create({
        studentId: userId,
        quizId,
        attemptCount: 1,
        score: 0, // initial score
      });
    }

    res.json({ message: "Attempt recorded", attemptCount: attempt.attemptCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to record attempt" });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { quizId, userId, answers } = req.body;

    const questions = await QuizQuestion.findAll({ where: { quizId } });
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });

    // Update existing attempt with score
    const attempt = await QuizAttempt.findOne({
      where: { studentId: userId, quizId },
    });

    if (attempt) {
      attempt.score = score;
      await attempt.save();
    }

    res.json({ score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit quiz" });
  }
};
exports.getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;

    const attempts = await QuizAttempt.findAll({ where: { studentId: userId } });

    // Map to { quizId, attemptNumber, score } for frontend
    const results = attempts.map((a) => ({
      quizId: a.quizId,
      attempt: a.attemptNumber,
      score: a.score,
      createdAt: a.createdAt,
    }));

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch results" });
  }
};
