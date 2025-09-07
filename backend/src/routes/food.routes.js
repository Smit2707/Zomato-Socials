const { getFoodController, createfood, likeFoodController, saveFoodController, getSavedFood } = require("../controllers/food.controller");
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

router.get("/", userMiddleware, getFoodController);

router.post("/like", userMiddleware, likeFoodController);

router.post("/save", userMiddleware, saveFoodController);
router.get("/save", userMiddleware, getSavedFood);

module.exports = router;