const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const foodPartnerModel = require("../models/foodpartner.model");

const registerController = async (req, res) => {

    const { fullName, email, password } = req.body;

    const userIsExist = await userModel.findOne({ email: email });

    if (userIsExist) {
        return res.status(400).json({
            message: "User Already Exist In The Server."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName, email, password: hashedPassword
    })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })

    res.cookie("token", token);

    res.status(201).json({
        message: "User Created Successfully.",
        token,
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullName
        }
    })
}

const loginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.status(400).json({
            message: "user not found. invalid email or password."
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "user not found. invalid email or password."
        });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // e.g., 1 day
        secure: true,      // Set to true for production (HTTPS)
        sameSite: 'None',  // Required for cross-origin cookies
        // domain: '.your-parent-domain.com' // Optional: if using subdomains
      });

    res.status(200).json({
        message: "User Logged In Successfully.",
        token,
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullName
        }
    })
}

const logoutController = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "user logged out successfully."
    })
}

const foodPartnerRegisterController = async (req, res) => {
    const { fullName, email, password, phone, address, contactName } = req.body;

    const partnerIsExist = await foodPartnerModel.findOne({ email: email });

    if (partnerIsExist) {
        return res.status(400).json({
            message: "Food Partner Already Exist In The Server."
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if(phone.length < 10 || phone.length > 10){
        return res.status(400).json({
            message: "Phone number must be 10 digit long."
        })
    }

    const foodPartner = await foodPartnerModel.create({
        fullName, email, password: hashedPassword, phone, address, contactName
    })

    const token = jwt.sign({ id: foodPartner._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' })

    res.cookie("token", token);

    res.status(201).json({
        message: "Food Partner Created Successfully.",
        token,
        user: {
            _id: foodPartner._id,
            email: foodPartner.email,
            fullname: foodPartner.fullName,
            phone: foodPartner.phone,
            contactName: foodPartner.contactName,
            address: foodPartner.address
        }
    })
}

const foodPartnerLoginController = async (req, res) => {
    const { email, password } = req.body;

    const partner = await foodPartnerModel.findOne({ email });
    if (!partner) {
        return res.status(400).json({
            message: "user not found. invalid email or password."
        })
    }

    const isPasswordCorrect = await bcrypt.compare(password, partner.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Partner not found. invalid email or password."
        });
    }

    const token = jwt.sign({ id: partner._id }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // e.g., 1 day
        secure: true,      // Set to true for production (HTTPS)
        sameSite: 'None',  // Required for cross-origin cookies
        // domain: '.your-parent-domain.com' // Optional: if using subdomains
      });

    res.status(200).json({
        message: "Food Partner Logged In Successfully.",
        token,
        partner: {
            _id: partner._id,
            email: partner.email,
            fullname: partner.fullName
        }
    })
}

module.exports = {
    registerController,
    loginController,
    logoutController,
    foodPartnerRegisterController,
    foodPartnerLoginController
}