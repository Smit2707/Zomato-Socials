const foodPartnerModel = require("../models/foodpartner.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");


const foodPartnerMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized token not found."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const partner = await foodPartnerModel.findById({ _id: decoded.id });

        req.partner = partner;

        next();

    } catch (error) {

        console.log("error : ", error);

    }
}
const userMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized token not found."
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const user = await userModel.findById({ _id: decoded.id });

        req.user = user;

        next();

    } catch (error) {

        console.log("error : ", error);

    }
}


module.exports = {
    foodPartnerMiddleware,
    userMiddleware
}