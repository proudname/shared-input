import express from 'express';
import http from 'http';
import { Server } from "socket.io";
import Message from "./models/message";
import { mongoose } from '@typegoose/typegoose';
import bodyParser from "body-parser";
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL || '')

app.use(cors({ origin: '*' }))
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
        for (const someSocket of io.sockets.sockets.values()) {
            if (socket.id === someSocket.id) continue;
            someSocket.emit('message', data);
        }
    })
});



server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});