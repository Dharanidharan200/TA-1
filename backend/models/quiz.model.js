module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    instructorId: DataTypes.UUID,
  });

  return Quiz;
};