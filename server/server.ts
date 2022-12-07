import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import Message from "./models/message";
import { mongoose } from '@typegoose/typegoose';
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://root:example@localhost:27017')

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
});

app.use(bodyParser.json())

app.post('/input', async (req, res) => {
    const { text, sessionId } = req.body;
    await Message.create({
        text,
        sessionId
    })
    res.send('OK');
});

io.on('connection', (socket) => {
    socket.on('message', (data) => {
        const { sessionId } = socket.handshake.query;
        for (const someSocket of io.sockets.sockets.values()) {
            const { sessionId: someSocketSessionId } = someSocket.handshake.query;
            if (someSocketSessionId === sessionId) continue;
            someSocket.emit('message', data);
        }
    })
});



server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});