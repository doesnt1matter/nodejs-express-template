require("dotenv").config();
const CORS = require("cors");
const express = require("express");
const ua = require("express-useragent");
const server = express();

const MySQLService = require("./Services/MySQLService.js");

server.use(express.json());
server.use(CORS({origin: "*", credentials: true}));
server.use(require('express-useragent').express());

server.use(require("./Middlewares/UserAgentMiddleware.js"));
server.use(require("./Middlewares/LogReqMiddleware.js"));
server.use(require("./Middlewares/LogResMiddleware.js"));

server.use("/info", require("./Routers/InfoRouter.js"));

server.use(require("./Middlewares/ErrorMiddleware.js"));

const port = process.env._port ?? 5000;

async function StartServer() {
    try {
        await MySQLService.Connect();
        server.listen(port, () => console.log(`SERVER START ON PORT ${port}`));
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

StartServer();