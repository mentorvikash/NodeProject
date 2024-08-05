const { Router } = require('express')

const ownerRouter = new Router()

ownerRouter.get('/', (req, res) => {
    res.send("this is owner route")
})

module.exports = ownerRouter