const express = require("express");
const { registerController, loginController, logoutController, foodPartnerRegisterController, foodPartnerLoginController } = require("../controllers/auth.controller");
const router = express.Router();

// user routes
router.post("/user/register", registerController);
router.post("/user/login", loginController);

// partner routes
router.post("/partner/register", foodPartnerRegisterController);
router.post("/partner/login", foodPartnerLoginController);

router.get("/logout", logoutController)

module.exports = router;