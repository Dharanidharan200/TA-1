// controllers/module.controller.js

const { Module } = require("../models");

exports.createModule = async (req, res, next) => {
  try {
    const { title, courseId } = req.body;

    const module = await Module.create({
      title,
      courseId,
    });

    res.status(201).json({
      message: "Module created",
      module,
    });
  } catch (err) {
    next(err);
  }
};