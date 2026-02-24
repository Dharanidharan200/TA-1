module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Booking", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE,
    status: {
      type: DataTypes.TEXT,
      defaultValue: "REQUESTED",
    },
  });
};