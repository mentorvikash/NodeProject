const { default: mongoose } = require("mongoose")

const userScheam = mongoose.Schema({
    username: String,
    fname: String,
    lname: String,
    email: { type: String, require },
    password: String,
})

module.exports = mongoose.model('User', userScheam)