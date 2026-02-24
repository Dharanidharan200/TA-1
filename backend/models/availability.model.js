module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Availability", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
  });
};

