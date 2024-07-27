const pg = require("pg");
const ErrorService = require("./ErrorService");

class PostgreSQLConnector {

    static connector
    static config

    static createConnector() {
        PostgreSQLConnector.config = {
            user: process.env.PG_USER,
            password: process.env.PG_PASSWORD,
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            database: process.env.PG_DATABASE,
        }

        PostgreSQLConnector.connector = new pg.Client(this.config);
    }

    async connect() {
        try {
            PostgreSQLConnector.createConnector();
            await PostgreSQLConnector.connector.connect();

            console.log('CONNECTED TO PostgreSQL');
        } catch (error) {
            let message = "Unrecognized error!"

            switch (error.code) {
                case "ECONNREFUSED":
                    message = "Service is down!"
                    break;

                case "3D000":
                    message = "Database is not exists!"
                    break;

                case "28P01":
                    message = "Authorization failed!"
                    break;

                default:
                    break;
            }

            console.error(message);
        }
    }
}

module.exports = new PostgreSQLConnector();