const { Router } = require('express')
const userRouter = new Router()

userRouter.get('/', (req, res) => {
    res.send("this is user route")
})


module.exports = userRouter