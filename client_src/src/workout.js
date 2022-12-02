const mysql = require("mysql2/promise");

const mysqlConfig = {
    host: "127.0.0.1",
    port: 3306, // could remove this if bugs
    user: "root",
    password: "Hinanawi4462.",
    database: "workout",
};

const createWorkout = async (username, title, date, startTime, endTime, exercises) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `INSERT INTO workout (username, title, date, startTime, endTime, exercises) VALUES ("${username}", "${title}", "${date}", "${startTime}", "${endTime}", '${JSON.stringify(exercises)}');`
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

const updateWorkout = async (username, title, date, startTime, endTime, exercises, oldTitle, oldDate, oldStartTime, oldEndTime) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `UPDATE workout SET title = "${title}", date = "${date}", startTime = "${startTime}", endTime = "${endTime}", exercises = '${JSON.stringify(exercises)}' WHERE username = "${username}" AND title = "${oldTitle}" AND date = "${oldDate}" AND startTime = "${oldStartTime}" AND endTime = "${oldEndTime}";`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
}

const deleteWorkout = async (username, oldTitle, oldDate, oldStartTime, oldEndTime) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `DELETE FROM workout WHERE username = "${username}" AND title = "${oldTitle}" AND date = "${oldDate}" AND startTime = "${oldStartTime}" AND endTime = "${oldEndTime}";`
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
    updateWorkout,
    deleteWorkout,
};

module.exports = workout;