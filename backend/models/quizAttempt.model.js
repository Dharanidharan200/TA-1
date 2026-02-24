// models/quizAttempt.model.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("QuizAttempt", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    score: DataTypes.INTEGER,
  });
};