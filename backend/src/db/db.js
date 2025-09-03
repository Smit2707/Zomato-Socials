const mongoose = require("mongoose")

const connectToDb =  () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then(()=>{
        console.log("Connected to db.")
    })
    .catch(err => console.log(err))
}

module.exports = connectToDb;