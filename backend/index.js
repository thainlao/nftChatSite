import  express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
import authRouter from "./router/auth.js"
import fileUpload from "express-fileupload";
import expressWs from 'express-ws';

dotenv.config()

const app = express();
const PORT = 5001;

expressWs(app);

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use(express.json());
app.use(express.static('uploads'))

app.use(fileUpload());
app.use('/api/auth', authRouter)

app.ws('/ws', (ws, req) => {
    console.log('WebSocket Connected');
  
    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send(`Server received: ${message}`);
    });
  
    ws.on('close', () => {
        console.log('WebSocket Closed');
    });
});

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        app.listen(PORT, () => console.log(`Сервер успешно запущен на ${PORT} порту`));
    } catch (e) {
        console.log(e);
    }
}

start();

