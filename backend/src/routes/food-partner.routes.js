const express = require("express");
const { userMiddleware } = require("../middlewares/auth.middleware");
const { getFoodPartnerById, getFoodByIdController } = require("../controllers/food-partner.controller");


const router = express.Router();

router.get('/profile/:id', userMiddleware, getFoodPartnerById);

module.exports = router;