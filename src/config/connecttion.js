const mysql = require("mysql2");

console.log("crete conection");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "foody",
});

connection.connect((err) => {
  if (err) {
    console.log("error connecting to the database");
    return;
  }
  console.log("Kết nối thành công với mySQL");
});

module.exports = connection;
