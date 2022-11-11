const mysql = require("mysql2-promise");

const mysqlConfig = {
    host: "localhost",
    // port: 3306, // could remove this if bugs
    user: "root",
    password: "",
    database: "workout",
};

const createWorkout = async (title, date, exercises) => {
    // console.log("here");
    console.log(title);
    console.log(date);
    console.log(exercises);
    // this works 
};

const workout = {
    createWorkout,
};

module.exports = workout;