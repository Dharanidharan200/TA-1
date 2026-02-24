module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Lesson", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
    type: {
      type: DataTypes.STRING,
    },
    content: DataTypes.TEXT,
  });
};