const mysql = require("mysql2");

let POOL = null;
class MySQLService
{
    static CreatePool()
    {
        POOL = mysql.createPool({
            connectionLimit: 5,
            host: process.env._db_host,
            user: process.env._db_user,
            database: process.env._db_schema,
            password: process.env._db_password
        }).promise();
    }

    static async CheckConnect()
    {
        const msqlErrors = {
            "-4078" : "MYSQL service is off",
            "1045" : "MYSQL USER invalid credentials",
            "1049" : "MYSQL invalid SCHEMA",
        }

        await POOL.getConnection()
            .then(() => console.log("Successfully connected to MySQL"))
            .catch((error) => {
                console.log(msqlErrors[error.errno] ?? "Connect to MySQL error!")
                console.log("err-code: " + error.errno);
                process.exit(1)
            })
    }

    static async Connect()
    {
        this.CreatePool();
        await this.CheckConnect();
    }

    static async Query(sql, fields)
    {
        let result = await POOL.query(sql, fields)
            .catch((error) => {
                console.log(error.message);
                return null;
            });

        if(!result) return result;
        else return result[0];
    }
}

module.exports = MySQLService;