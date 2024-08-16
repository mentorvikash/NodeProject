const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const User = require('../models/userModle')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

mongoose.connect("mongodb://localhost:27017/mongomini")
    .then(() => {
        console.log("database connected")
    })
    .catch((err) => {
        console.log("mongoerr ", err.message)
    })

const app = express()

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.set("view engine", "ejs");

// api
app.get('/', (req, res) => {
    res.render("index")
})

// registartion

app.post("/signup", async (req, res) => {
    try {
        const { email, fname, lname, username, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already present" })
        }

        const salt = await bcrypt.genSalt(10)
        const encPassword = await bcrypt.hash(password, salt)
        user = new User({ email, fname, lname, username, password: encPassword })
        await user.save()
        // user.id

        const secretKey = "1454f1dafafdafjafdkajdakf"
        const token = await jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1d" })
        res.cookie("token", token);
        res.status(201).json({ message: "successfully Registered" })
    } catch (error) {
        console.log("err", error.message)
    }
})


app.listen(5000, () => {
    console.log("server is running at 5000")
})