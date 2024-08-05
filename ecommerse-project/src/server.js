const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const routes = require('../routes/index.js')
const cookieParser = require('cookie-parser')
const dbConnect = require('../services/database.js')
dotenv.config()
dbConnect()

const port = process.env.PORT || 5001
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use('/', routes)

// Routes
app.get('/', (req, res) => {
    res.render('index')
})


app.listen(port, () => {
    console.log('server is running at ' + port)
})