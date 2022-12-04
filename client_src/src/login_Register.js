const mysql = require("mysql2/promise");

const mysqlConfig = {
    host: "127.0.0.1",
    port: 3306, // could remove this if bugs
    user: "root",
    password: "",
    database: "workout",
};

const createAccount = async (username, password) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `INSERT INTO user (username, password) VALUES ("${username}", "${password}");`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
};

const getInfo = async () => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `SELECT * FROM user;`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
}

const login_Register = {
    createAccount,
    getInfo,
};

module.exports = login_Register;