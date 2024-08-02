const mysql = require("mysql2");

let POOL = null;
class MySQLConnector {
    static CreatePool() {
        POOL = mysql.createPool({
            connectionLimit: 5,
            host: process.env._db_host,
            user: process.env._db_user,
            database: process.env._db_schema,
            password: process.env._db_password
        }).promise();
    }

    static async CheckConnect() {
        const msqlErrors = {
            "-4078": "MYSQL: Service is down",
            "1045": "MYSQL: User invalid credentials",
            "1049": "MYSQL: Invalid schema",
        }

        await POOL.getConnection()
            .then(() => console.log("Successfully connected to MySQL"))
            .catch((error) => {
                const errno = error.errno ?? error.errors[1].errno;
                console.error(msqlErrors[errno] ?? "Connect to MySQL error!")
            })
    }

    static async Connect() {
        this.CreatePool();
        await this.CheckConnect();
    }

    static async Query(sql, fields) {
        let result = await POOL.query(sql, fields)
            .catch((error) => {
                console.log(error.message);
                return null;
            });

        if (!result) return result;
        else return result[0];
    }
}

module.exports = MySQLConnector;