const jwt = require("jsonwebtoken");
const Blacklist = require("../models/blacklist");

module.exports = async (req, res, next) => {
    try {
        const token = req.header("auth-admin");
        const result = await Blacklist.findOne({ token: token });
        if (result != null) return res.status(409).json({
            message: "Token expired",
            statusCode: 409
        });
        next();
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}