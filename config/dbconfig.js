var mysql = require("mysql2");
require("dotenv").config();

var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_SCHEMA,
});

connection.connect((err) => {
  if (err) throw err;
  else {
    console.log("Connection Successfull");
  }
});
module.exports = connection;
