const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    image: { type: String, require },
    name: { type: String, require },
    price: { type: Number, require },
    discount: { type: Number, default: 0 },
    bgcolor: { type: String, default: 'black' },
    panelcolor: { type: String, default: 'yellow' },
    textcolor: { type: String, default: 'white' },
})

module.exports = mongoose.model('Product', productSchema) 