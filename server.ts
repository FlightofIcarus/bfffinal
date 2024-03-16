import "dotenv/config";
import express  from "express";
import { json, Express,  urlencoded} from "express";
import bffControllers from "./controllers/bffController";

const server: Express = express();

server.use(json());

server.use(urlencoded());

// server.use(bffControllers);

server.post("/api/bff", (req, res) => {
    res.send('<h1>Funfando!</h1>')
});

const port: number | string = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor BFF on na porta ${port}`); 
});