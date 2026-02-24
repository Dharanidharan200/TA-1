// server.js
const app = require("./app");
const { sequelize } = require("./models");

sequelize.sync().then(() => {
  app.listen(5000, () =>
    console.log("Server running on 5000")
  );
});