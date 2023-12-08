const mysql = require("mysql2");

let POOL = null;
class DBService 
{
    CreatePool()
    {
        POOL = mysql.createPool({
            connectionLimit: 5,
            host: process.env._db_host,
            user: process.env._db_user,
            database: process.env._db_schema,
            password: process.env._db_password
        }).promise();
    }

    async CheckConnect()
    {
        const msqlErrors = {
            "-4078" : "MYSQL shotout",
            "1045" : "MYSQL USER invalid credentials",
            "1049" : "MYSQL uncorrect SCHEMA",
        }

        await POOL.getConnection()
            .then(() => console.log("Successfully connected to MySQL"))
            .catch((error) => {
                console.log(msqlErrors[error.errno] ?? "Connect to MySQL error!")
                process.exit(1)
            })
    }

    async Connect()
    {
        this.CreatePool();
        await this.CheckConnect();
    }

    async Query(sql, fields)
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

module.exports = new DBService();