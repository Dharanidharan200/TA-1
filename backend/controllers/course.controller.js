// controllers/course.controller.js

const { Course } = require("../models");

// CREATE COURSE
exports.createCourse = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const course = await Course.create({
      title,
      description,
      instructorId: req.user.id,
    });

    res.status(201).json({
      message: "Course created",
      course,
    });
  } catch (err) {
    next(err);
  }
};

// GET COURSES (pagination + search)
exports.getCourses = async (req, res, next) => {
  try {
    
    const { page = 1, limit = 10, search = "" } = req.query;

    const courses = await Course.findAndCountAll({
      where: {
        title: {
          [require("sequelize").Op.iLike]: `%${search}%`,
        },
      },
      offset: (page - 1) * limit,
      limit: Number(limit),
    });

    res.json(courses);
  } catch (err) {
    next(err);
  }
};