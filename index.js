require("dotenv").config();
const CORS = require("cors");
const express = require("express");
const server = express();

server.use(express.json());
server.use(CORS({origin: "*", credentials: true}));

const port = process.env._port ?? 5000;

function StartServer() {
    try {
        server.listen(port, () => console.log(`SERVER START ON PORT ${port}`))
    } 
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

StartServer();