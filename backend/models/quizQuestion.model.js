module.exports = (sequelize, DataTypes) => {
  const QuizQuestion = sequelize.define(
    "QuizQuestion",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quizId: {
        type: DataTypes.UUID,
        allowNull: false,
      },

      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      optionA: DataTypes.STRING,
      optionB: DataTypes.STRING,
      optionC: DataTypes.STRING,
      optionD: DataTypes.STRING,

      correctAnswer: DataTypes.STRING,
    }
  );

  return QuizQuestion;
};