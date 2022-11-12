const mysql = require("mysql2/promise");

const mysqlConfig = {
    host: "127.0.0.1",
    port: 3306, // could remove this if bugs
    user: "root",
    password: "Destroyer21823iw.",
    database: "workout",
};

const createWorkout = async (username, title, date, exercises) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `INSERT INTO workout (username, title, date, exercises) VALUES ("${username}", "${title}", "${date}", '${JSON.stringify(exercises)}');`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
};

const getWorkout = async () => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `SELECT * FROM workout`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
}

const workout = {
    createWorkout,
    getWorkout,
};

module.exports = workout;