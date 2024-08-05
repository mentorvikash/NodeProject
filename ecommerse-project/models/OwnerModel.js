const mongoose = require('mongoose')

const ownerSchema = mongoose.Schema({
    fullName: { type: String, require },
    email: { type: String, require },
    contact: { type: String, require },
    picture: { type: String },
    product: { type: Array, default: [] },
    gstin: String
})

module.exports = mongoose.model('Owner', ownerSchema)