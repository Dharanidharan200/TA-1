module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Module", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: DataTypes.STRING,
  });
};