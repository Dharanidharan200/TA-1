// models/quizQuestion.model.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("QuizQuestion", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    question: DataTypes.STRING,
    options: DataTypes.JSONB,
    correctAnswer: DataTypes.STRING,
  });
};