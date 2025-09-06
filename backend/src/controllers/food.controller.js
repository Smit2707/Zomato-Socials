const foodModel = require("../models/food.model");
const foodPartnerModel = require("../models/foodpartner.model");
const likeModel = require("../models/like.model");
const saveModel = require("../models/save.model");
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

const likeFoodController = async (req, res) => {
    const user = req.user;

    const { foodId } = req.body;

    const isLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if (isLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await likeModel.findOneAndUpdate({
            foodId,
            $inc: { likeCount: -1 }
        })

        return res.status(200).json({
            message: "Food Unliked Successfully."
        });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });

    await likeModel.findOneAndUpdate({
        foodId,
        $inc: { likeCount: 1 }
    })

    res.status(201).json({
        message: "Food Liked Successfully.",
        like
    })
}

const saveFoodController = async (req, res) => {
    const { foodId } = req.body;

    const user = req.user;

    const isSaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });

    if (isSaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        return res.status(200).json({
            message: "Food Unaved Successfully."
        });
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });

    res.status(201).json({
        message: "Saved Food Successfully.",
        save
    })

}


module.exports = { createfood, getFoodController, likeFoodController, saveFoodController };