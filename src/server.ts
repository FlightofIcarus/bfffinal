import "dotenv/config";
import cors from "cors";
import express  from "express";
import { json, Express,  urlencoded} from "express";
import bffController from "./controllers/BffController";
import axios from "axios";

const defaultPath = String(process.env.API_PATH)

const bffRequestManager = new bffController(axios, defaultPath)

const server: Express = express();

server.use(json());

server.use(urlencoded());

const corsLiberada = ['http://localhost:5500', 'http://127.0.0.1:5500'];

const corsOptions = {
    origin: corsLiberada
};

server.use(cors(corsOptions))

server.post("/api/bff", bffRequestManager.bffpost);

const port: number | string = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor BFF on na porta ${port}`); 
});