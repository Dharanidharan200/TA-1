// controllers/auth.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.register = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(
            req.body.password,
            10
        );

        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || "STUDENT",
            approved: false,
        });

        const userData = user.toJSON();
        delete userData.password;

        res.status(201).json(userData);

    } catch (err) {
        console.log(err);

        res.send({ msg: `Error While Register` })
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    /* FIND USER */
    const user = await User.findOne({
        where: { email },
    });

    if (!user) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    /* CHECK PASSWORD */
    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid) {
        return res.status(401).json({
            message: "Invalid password",
        });
    }

    /* 🔥 APPROVAL CHECK */
    if (
        user.role === "STUDENT" &&
        !user.approved
    ) {
        return res.status(403).json({
            message:
                "Waiting for admin approval",
        });
    }

    /* TOKEN */
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET
    );

    res.json({
        token,
        role: user.role,
    });
};

exports.getUsers = async (req, res) => {
    const { role } = req.query;

    const where = {};

    if (role) where.role = role;

    const users =
        await User.findAndCountAll({
            where,
            order: [["createdAt", "DESC"]],
        });

    res.json(users);
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    const deleted = await User.destroy({
        where: { id },
    });

    if (!deleted) {
        return res.status(404).json({
            message: "User not found",
        });
    }

    res.json({
        message: "User deleted",
    });
};