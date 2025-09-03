const foodModel = require("../models/food.model");

const createfood = async (req, res) => {
    const partner = req.partner;
    res.send("food created successfully.");
    console.log(req.body);
    console.log(req.file);
}

module.exports = createfood;