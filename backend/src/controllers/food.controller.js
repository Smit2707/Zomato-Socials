const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid")

const createfood = async (req, res) => {
    const partner = req.partner;
    console.log(partner)
    console.log(req.body);
    console.log(req.file);

    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No video file provided' });
        }

        const fileUrl = await uploadFile(req.file.buffer, uuid());

        const foodItem = await foodModel.create({
            name: req.body.name,
            video: fileUrl,
            description: req.body.description,
            foodPartner: partner._id
        });
    }
    catch (err) {
        console.log(err)
    }

    res.status(201).json({
        message: "Food Item Added Successfully.",
        food: foodItem
    })
}

const getFoodController = async (req, res) => {
    const foods = await foodModel.find({});
    res.status(200).json({
        message: "Food Items Fetched Successfully.",
        food: foods
    })
}

module.exports = { createfood, getFoodController };