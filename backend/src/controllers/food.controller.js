const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid")

const createfood = async (req, res) => {
    const partner = req.partner;
    console.log(partner._id)
    console.log(req.body);
    console.log(req.file);

    const fileUploadResult = await uploadFile(req.file.buffer, uuid())

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: partner._id
    })

    res.status(201).json({
        message: "food created successfully",
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