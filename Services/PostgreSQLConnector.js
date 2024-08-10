const pg = require("pg");
const ErrorService = require("./ErrorService.js");

class PostgreSQLConnector {

    static Client
    static Config

    static CreateConnector() {
        PostgreSQLConnector.Config = {
            user: process.env._pg_db_user,
            password: process.env._pg_db_password,
            host: process.env._pg_db_host,
            port: process.env._pg_db_port,
            database: process.env._pg_db_database
        }

        PostgreSQLConnector.Client = new pg.Client(this.Config);
    }

    static async Connect() {
        try {
            PostgreSQLConnector.CreateConnector();
            await PostgreSQLConnector.Client.connect();

            console.log('CONNECTED TO PostgreSQL');
        } catch (error) {
            let message = "PostgreSQL: Unrecognized error!"

            switch (error.code) {
                case "ECONNREFUSED":
                    message = "PostgreSQL: Service is down!"
                    break;

                case "3D000":
                    message = "PostgreSQL: Database is not exists!"
                    break;

                case "28P01":
                    message = "PostgreSQL: Authorization failed!"
                    break;

                default:
                    break;
            }

            console.error(message);
        }
    }

    static async Query(sql) {
        return await PostgreSQLConnector.Client.query(`${sql}`);
    }
}

module.exports = PostgreSQLConnector;