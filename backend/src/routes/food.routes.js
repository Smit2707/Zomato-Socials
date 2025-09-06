const { getFoodController, createfood, getFoodByIdController } = require("../controllers/food.controller");
const { foodPartnerMiddleware, userMiddleware } = require("../middlewares/auth.middleware");
const foodModel = require("../models/food.model");
const express = require("express")
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
})

const router = express.Router();

router.post(
    '/',
    foodPartnerMiddleware,
    upload.single("video"),
    createfood
);

router.get("/", userMiddleware, getFoodController)

module.exports = router;