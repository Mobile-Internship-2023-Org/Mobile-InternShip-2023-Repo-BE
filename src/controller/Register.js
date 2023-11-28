import connection from "../config/connecttion";

const postRegister = (req, res) => {
  console.log(req.body);
  const { Email, Password } = req.body;

  // Kiểm tra giá trị null cho email và password
  if (!Email || !Password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Thực hiện truy vấn SQL để chèn dữ liệu
  connection.query(
    "INSERT INTO nguoiDung (email, matKhau, role) VALUES (?, ?, ?)",
    [Email, Password, "user"],
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
};

module.exports = {
  postRegister,
};
