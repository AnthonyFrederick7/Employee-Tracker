const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Raider#7",
  database: "employees_db",
});

connection.connect();

module.exports = connection;