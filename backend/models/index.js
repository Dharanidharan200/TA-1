// models/index.js
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = require("./user.model")(sequelize, DataTypes);
const Course = require("./course.model")(sequelize, DataTypes);
const Module = require("./module.model")(sequelize, DataTypes);
const Lesson = require("./lesson.model")(sequelize, DataTypes);
const Booking = require("./booking.model")(sequelize, DataTypes);
const QuizQuestion = require("./quizQuestion.model")(sequelize, DataTypes);
const QuizAttempt = require("./quizAttempt.model")(sequelize, DataTypes);
const Availability = require("./availability.model")(sequelize, DataTypes);


User.hasMany(Course);
Course.belongsTo(User, { as: "instructor" });

Course.hasMany(Module);
Module.belongsTo(Course);

Module.hasMany(Lesson);
Lesson.belongsTo(Module);

User.hasMany(Booking, { as: "studentBookings" });
User.hasMany(Booking, { as: "instructorBookings" });

Booking.belongsTo(User, { as: "student" });
Booking.belongsTo(User, { as: "instructor" });

Lesson.hasMany(QuizQuestion);
QuizQuestion.belongsTo(Lesson);

User.hasMany(QuizAttempt);
QuizAttempt.belongsTo(User);

Lesson.hasMany(QuizAttempt);
QuizAttempt.belongsTo(Lesson);

User.hasMany(Availability);
Availability.belongsTo(User);

module.exports = {
    sequelize,
    User,
    Course,
    Module,
    Lesson,
    Booking,
    QuizQuestion,
    QuizAttempt,
    Availability
};