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
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role || "STUDENT",
        });

        const userData = user.toJSON();
        delete userData.password;

        res.status(201).json(userData);

    } catch (err) {
        console.log(err);
        
        res.send({ msg: `Error While Register` })
    }
};

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
        });

        const match = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!match)
            return res.status(400).json({ message: "Invalid" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET
        );
        var role = user.role

        res.json({ token, role });
    } catch (err) {
        next(err);
    }
};