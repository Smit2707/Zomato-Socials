const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");

const getFoodPartnerById = async (req, res) => {
    const params_id = req.params.id;
    console.log(params_id);
    const partner = await foodPartnerModel.findById(params_id);
    const foods = await foodModel.find({foodPartner: params_id} );

    if (!params_id) {
        return res.status(404).json({
            message: "Food Partner Not Found."
        })
    }

    res.status(200).json({
        message: "Food Partner Fetched Successfully.",
        partner,
        foods: foods
    });
}


module.exports = {
    getFoodPartnerById,
}