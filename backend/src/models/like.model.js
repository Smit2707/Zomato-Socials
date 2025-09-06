const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "food",
        required: true
    },
}, { timestamps: true });

const likeModel = mongoose.model("likes", likeSchema);

module.exports = likeModel;