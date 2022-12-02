const mysql = require("mysql2/promise");

const mysqlConfig = {
    host: "127.0.0.1",
    port: 3306, // could remove this if bugs
    user: "root",
    password: "Destroyer21823iw.",
    database: "workout",
};

const createMeal = async (username, date, meals) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `INSERT INTO meal (username, date, meals) VALUES ("${username}", "${date}", '${JSON.stringify(meals)}');`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
};

const getMeal = async () => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `SELECT * FROM meal`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
}

const meal = {
    createMeal,
    getMeal,
    // updateMeal,
    // deleteMeal,
};

module.exports = meal;