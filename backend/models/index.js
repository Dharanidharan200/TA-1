const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

/* =========================
   IMPORT MODELS
========================= */

const User = require("./user.model")(sequelize, DataTypes);
const Course = require("./course.model")(sequelize, DataTypes);
const Module = require("./module.model")(sequelize, DataTypes);
const Lesson = require("./lesson.model")(sequelize, DataTypes);
const Booking = require("./booking.model")(sequelize, DataTypes);
const Availability = require("./availability.model")(sequelize, DataTypes);

const Quiz = require("./quiz.model")(sequelize, DataTypes);
const QuizQuestion = require("./quizQuestion.model")(sequelize, DataTypes);
const QuizAssignment = require("./quizAssignment.model")(sequelize, DataTypes);
const QuizAttempt = require("./quizAttempt.model")(sequelize, DataTypes);




User.hasMany(Course, { foreignKey: "instructorId" });
Course.belongsTo(User, {
    as: "instructor",
    foreignKey: "instructorId",
});




Course.hasMany(Module);
Module.belongsTo(Course);

Module.hasMany(Lesson);
Lesson.belongsTo(Module);




User.hasMany(Booking, {
    as: "studentBookings",
    foreignKey: "studentId",
});

User.hasMany(Booking, {
    as: "instructorBookings",
    foreignKey: "instructorId",
});

Booking.belongsTo(User, {
    as: "student",
    foreignKey: "studentId",
});

Booking.belongsTo(User, {
    as: "instructor",
    foreignKey: "instructorId",
});




User.hasMany(Availability);
Availability.belongsTo(User);





Course.hasMany(Quiz, {
    foreignKey: "courseId",
});
Quiz.belongsTo(Course, {
    foreignKey: "courseId",as: 'course'
});


Quiz.hasMany(QuizQuestion, {
    foreignKey: "quizId",
});
QuizQuestion.belongsTo(Quiz, {
    foreignKey: "quizId",
});


Quiz.hasMany(QuizAssignment, {
    foreignKey: "quizId",
});
QuizAssignment.belongsTo(Quiz, {
    foreignKey: "quizId",
});


User.hasMany(QuizAssignment, {
    as: "assignedQuizzes",
    foreignKey: "studentId",
});
QuizAssignment.belongsTo(User, {
    as: "student",
    foreignKey: "studentId",
});
// QuizAssignment model
QuizAssignment.belongsTo(Quiz, { foreignKey: 'quizId', as: 'quiz' });

// Quiz model
Quiz.hasMany(QuizAssignment, { foreignKey: 'quizId', as: 'assignments' });
QuizAttempt.belongsTo(Quiz, { foreignKey: "quizId", as: "quiz" }); // ✅ add alias


Quiz.hasMany(QuizAttempt, {
    foreignKey: "quizId",
});
QuizAttempt.belongsTo(Quiz, {
    foreignKey: "quizId",
});


User.hasMany(QuizAttempt, {
    as: "attempts",
    foreignKey: "studentId",
});
QuizAttempt.belongsTo(User, {
    as: "student",
    foreignKey: "studentId",
});



module.exports = {
    sequelize,
    User,
    Course,
    Module,
    Lesson,
    Booking,
    Availability,
    Quiz,
    QuizQuestion,
    QuizAssignment,
    QuizAttempt,
};