const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres",     // DB Name
  "postgres",    // DB User
  "1234",    // DB Password
  {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = sequelize;