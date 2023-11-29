

import connection from "../config/connecttion";
import bcrypt from "bcrypt";

const postLogIn = (req, res) => {
  const { Email, Password } = req.body;

  // Lấy thông tin người dùng từ cơ sở dữ liệu
  connection.query(
    "SELECT * FROM nguoidung WHERE email = ?",
    [Email],
    (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const user = results[0];

      // So sánh mật khẩu
      bcrypt.compare(Password, user.matKhau, (err, result) => {
        if (err || !result) {
          return res.status(401).json({ message: "Invalid email or password" });
        }

        // Xác thực thành công
        res.json({ message: "Login successful", role: user.role });
      });
    }
  );
};

module.exports = {
  postLogIn,
};