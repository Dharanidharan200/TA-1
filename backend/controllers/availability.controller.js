const { Availability } = require("../models");

exports.addAvailability = async (req, res, next) => {
  try {
    const availability = await Availability.create({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      UserId: req.user.id, // instructor id
    });

    res.json({
      message: "Availability added",
      availability,
    });
  } catch (err) {
    next(err);
  }
};

exports.getInstructorAvailability = async (req, res, next) => {
  try {
    const instructorId = req.params.instructorId;

    const slots = await Availability.findAll({
      where: { UserId: instructorId },
      order: [["startTime", "ASC"]],
    });

    res.json(slots);
  } catch (err) {
    next(err);
  }
};