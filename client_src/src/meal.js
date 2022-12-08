const mysql = require("mysql2/promise");

const mysqlConfig = {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
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

const updateMeal = async (username, date, meals , oldDate) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `UPDATE meal SET date = "${date}", meals = '${JSON.stringify(meals)}' WHERE username = "${username}" AND date = "${oldDate}";`
        );
        connection.end();
        return rows;
    } catch (e) {
        console.error(e);
    }
}

const deleteMeal = async (username, oldDate) => {
    try {
        const connection = await mysql.createConnection(mysqlConfig);
        const [rows, fields] = await connection.execute(
            `DELETE FROM meal WHERE username = "${username}" AND date = "${oldDate}";`
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
    updateMeal,
    deleteMeal,
};

module.exports = meal;
