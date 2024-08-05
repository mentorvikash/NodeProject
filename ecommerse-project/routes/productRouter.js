const { Router } = require('express')

const productRouter = new Router()

productRouter.get('/', (req, res) => {
    res.send("this is product route")
})


module.exports = productRouter