// app.js

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors())

// Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/users", require("./routes/user.routes"));
app.use("/courses", require("./routes/course.routes"));
app.use("/modules", require("./routes/module.routes"));
app.use("/lessons", require("./routes/lesson.routes"));
app.use("/bookings", require("./routes/booking.routes"));
app.use("/quiz", require("./routes/quiz.routes"));
app.use("/availability",require("./routes/availability.routes"));
// Error handler
app.use(require("./middleware/error.middleware").errorHandler);

module.exports = app;