import express from 'express'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { Chess } from 'chess.js'
dotenv.config()

const chess = new Chess()

// Varible to track players
const players = {};
let currentPlayer = 'w'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log({ __dirname })

const port = process.env.PORT || 4000

const app = express()
const server = http.createServer(app);
const io = new SocketServer(server)

io.on('connection', (socket) => {
    console.log("user connected")

    if (!players.white) {
        players.white = socket.id
        socket.emit("player-role", "w")
    } else if (!players.black) {
        players.black = socket.id
        socket.emit("player-role", "b")
    } else {
        socket.emit("spaculator")
        if (socket.id == players.white) {
            delete players.white
        } else if (socket.id == players.black) {
            delete players.black
        }
    }

    socket.on("move", (playerMove) => {
        try {
            if (chess.turn() == 'w' && socket.id != players.white) return
            if (chess.turn() == 'b' && socket.id != players.black) return
            const result = chess.move(playerMove);
            if (result) {
                currentPlayer = chess.turn();
                io.emit(move, playerMove)
                io.emit("boardState", playerMove)
            } else {
                console.log("invalid move", playerMove)
                socket.emit('invalidMove', playerMove)
            }
        } catch (error) {
            console.log("error", error.message)
            socket.emit('invalidMove', playerMove)
        }
    })

    socket.on('disconnect', () => {
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