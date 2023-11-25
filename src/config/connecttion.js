const mysql = require("mysql2");

console.log("Tạo kết nối");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "foody",
});

connection.connect((err) => {
  if (err) {
    console.log("Lỗi khi kết nối đến cơ sở dữ liệu");
    return;
  }
  console.log("Kết nối thành công với MySQL");
});

module.exports = connection;
