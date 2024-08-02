import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIoServer } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 4001;
const app = express();
const server = createServer(app);
const io = new SocketIoServer(server);

// middlewares
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(cors());

io.on('connection', (socket) => {
    console.log("User connected:", socket.id);

    socket.on("send-location", (data) => {
        // Broadcast the location data to all connected clients
        io.emit("received-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        // Notify all clients that the user has disconnected
        io.emit('user-disconnected', { id: socket.id });
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

// Use server.listen instead of app.listen
server.listen(port, () => {
    console.log("server is listening at:", port);
});
