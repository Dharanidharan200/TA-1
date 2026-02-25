module.exports = (sequelize, DataTypes) => {
  const QuizAssignment =
    sequelize.define("QuizAssignment", {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      quizId: DataTypes.UUID,

      studentId: DataTypes.UUID,
    });

  return QuizAssignment;
};