require("dotenv").config();
const CORS = require("cors");
const express = require("express");
const server = express();

const MySQLConnector = require("./Services/MySQLConnector.js");
const PostgreSQLConnector = require("./Services/PostgreSQLConnector.js");

server.use(express.json());
server.use(CORS({ origin: "*", credentials: true }));
server.use(require('express-useragent').express());

server.use(require("./Middlewares/UserAgentMiddleware.js"));
server.use(require("./Middlewares/IPMiddleware.js"));

server.use("/system", require("./Routers/SystemRouter.js"));
server.use("/auth", require("./Routers/AuthRouter.js"));

server.use(require("./Middlewares/ErrorMiddleware.js"));

const port = process.env._port ?? 5000;

async function StartServer() {
    try {
        //await MySQLConnector.Connect();
        //await PostgreSQLConnector.connect();
        server.listen(port, () => console.log(`SERVER START ON PORT ${port}`));
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

StartServer();