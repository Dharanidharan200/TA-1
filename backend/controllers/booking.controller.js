// controllers/booking.controller.js

const { Booking } = require("../models");
const { Op } = require("sequelize");


// Create Booking (Student)
exports.createBooking = async (req, res, next) => {
  try {
    const { instructorId, startTime, endTime } = req.body;

    // Conflict detection
    const conflict = await Booking.findOne({
      where: {
        instructorId,
        status: {
          [Op.in]: ["REQUESTED", "APPROVED"],
        },
        startTime: {
          [Op.lt]: new Date(endTime),
        },
        endTime: {
          [Op.gt]: new Date(startTime),
        },
      },
    });

    if (conflict) {
      return res.status(400).json({
        message: "Instructor already booked",
      });
    }

    const booking = await Booking.create({
      instructorId,
      studentId: req.user.id,
      startTime,
      endTime,
      status: "REQUESTED",
    });

    res.status(201).json({
      message: "Booking requested",
      booking,
    });
  } catch (err) {
    next(err);
  }
};

// Approve Booking (Admin)
exports.approveBooking = async (req, res, next) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "APPROVED";
    await booking.save();

    res.json({
      message: "Booking approved",
      booking,
    });
  } catch (err) {
    next(err);
  }
};

// Weekly Calendar
exports.getCalendar = async (req, res, next) => {
  try {
    const bookings = await Booking.findAll();

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};
exports.getWeeklyBookings = async (req, res, next) => {
  try {
    const { start, end } = req.query;

    const bookings = await Booking.findAll({
      where: {
        startTime: {
          [Op.between]: [start, end],
        },
      },
      order: [["startTime", "ASC"]],
    });

    res.json(bookings);
  } catch (err) {
    next(err);
  }
};