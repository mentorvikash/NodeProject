import express from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config()


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log({ __dirname })

const port = process.env.PORT || 4000

const app = express()
const server = http.createServer(app);
const io = new SocketServer(server)

io.on('connection', (socket) => {
    console.log("user connected")

    socket.on('diconnected', () => {
        console.log("user disconnected")
    })
})

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, 'views'));
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', { title: "Chess Game" })
})



server.listen(port, () => {
    console.log('server is running at: ' + port)
})