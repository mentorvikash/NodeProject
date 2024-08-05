const mongoose = require("mongoose");

const dbConnect = function () {
    mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("database connected")
        })
        .catch((err) => {
            console.log("database errror", err.message)
        })
}

module.exports = dbConnect
