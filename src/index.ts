import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";
import dotenv from 'dotenv';
import { seedData } from "./db/seedData";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'https://points-35d3d.web.app/'],
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);

server.listen(port, () => {
    console.log(`server is running on http:/localhost:${port}/`);
});

const MONGO_URL = process.env.MONGO_URL;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

seedData();
