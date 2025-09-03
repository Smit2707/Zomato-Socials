const foodModel = require("../models/food.model");
const { uploadFile } = require("../services/storage.service");
const { v4: uuid } = require("uuid")

const createfood = async (req, res) => {
    const partner = req.partner;
    console.log(partner)
    console.log(req.body);
    console.log(req.file);

    const fileUpload = await uploadFile(req.file.buffer, uuid());

    const foodItem = await foodModel.create({
        name: req.body.name,
        video: fileUpload.url,
        description: req.body.descreption,
        foodPartner: partner._id
    });

    res.status(201).json({
        message: "Food Item Added Successfully.",
        food : foodItem
    })
}

module.exports = createfood;