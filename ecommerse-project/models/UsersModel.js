const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fullName: { type: String, require },
    email: { type: String, require },
    contact: { type: String, require },
    picture: { type: String },
    cart: { type: Array, default: [] },
    orders: { type: Array, default: [] },
})

module.exports = mongoose.model('User', userSchema)