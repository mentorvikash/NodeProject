const { Router } = require('express')
const userRouter = require("./userRouter")
const productRouter = require("./productRouter")
const ownerRouter = require('./ownerRouter')

const routes = new Router()

routes.use("/user", userRouter)
routes.use("/product", productRouter)
routes.use("/owner", ownerRouter)

module.exports = routes 