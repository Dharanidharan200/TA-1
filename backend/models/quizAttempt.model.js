module.exports = (sequelize, DataTypes) => {
  const QuizAttempt =
    sequelize.define(
      "QuizAttempt",
      {
        id: {
          type: DataTypes.UUID,
          defaultValue:
            DataTypes.UUIDV4,
          primaryKey: true,
        },

        quizId: DataTypes.UUID,
        studentId: DataTypes.UUID,
        score: DataTypes.INTEGER,
        attemptCount: DataTypes.INTEGER,
      }
    );

  return QuizAttempt;
};