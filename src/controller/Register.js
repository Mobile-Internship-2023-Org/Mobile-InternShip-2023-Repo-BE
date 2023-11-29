

const connection = require("../config/connecttion");
const bcrypt = require("bcrypt");

const postRegister = (req, res) => {
  console.log(req.body);
  const { Email, Password } = req.body;

  // Kiểm tra giá trị null cho email và password
  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Kiểm tra email có bị trùng
  connection.query(
    "SELECT COUNT(*) AS count FROM nguoidung WHERE email = ?",
    [Email],
    (err, selectResults) => {
      if (err) {
        console.error("Database select error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      const count = selectResults[0].count;

      // Kiểm tra xem email đã tồn tại hay chưa
      if (count > 0) {
        console.log("Email is already in use");
        return res.status(400).json({ message: "Email is already in use" });
      }

      // Email không tồn tại, tiếp tục mã hóa mật khẩu và chèn dữ liệu vào cơ sở dữ liệu
      bcrypt.hash(Password, 10, (err, hashedPassword) => {
        if (err) {
          console.error("Password hash error:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
        // In ra giá trị mật khẩu đã được mã hóa
        console.log("Hashed password:", hashedPassword);

        // Chèn dữ liệu vào cơ sở dữ liệu
        connection.query(
          "INSERT INTO nguoidung (email, matKhau, role) VALUES (?, ?, ?)",
          [Email, hashedPassword, "user"],
          (err, insertResults) => {
            if (err) {
              console.error("Database insert error:", err);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            // Kiểm tra xem dữ liệu đã được chèn thành công hay không
            console.log("Insert results:", insertResults);

            // Xuất thông báo khi đăng ký thành công
            res.json({ message: "Registration successful" });
          }
        );
      });
    }
  );
};

module.exports = {
  postRegister,
};