require("dotenv").config();
const CORS = require("cors");
const express = require("express");
const server = express();

const MySQLService = require("./Services/MySQLService.js");

server.use(express.json());
server.use(CORS({origin: "*", credentials: true}));

server.use("/info", require("./Routers/InfoRouter.js"))

const port = process.env._port ?? 5000;

function StartServer() {
    try {
        MySQLService.Connect();
        server.listen(port, () => console.log(`SERVER START ON PORT ${port}`))
    } 
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

StartServer();