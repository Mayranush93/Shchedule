const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "schedule",
    password: ""
}).promise();

module.exports = connection;
