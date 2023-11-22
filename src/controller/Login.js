
import connection from "../config/connecttion";

const postLogIn = (req, res) => {
    // console.log("check data",req.body);
   const { Email, Password } = req.body;

  // Kiểm tra sự trùng khớp giữa username và password
   connection.query(
     "SELECT * FROM nguoiDung WHERE email = ? AND matKhau = ?",
     [Email, Password],
     (err, results) => {
      if (err) {
       console.error("Database query error:", err);
        return res.status(500).json({ message: "Internal Server Error" });
       }

       if (results.length === 0) {
         return res
          .status(401)
         .json({ message: "Invalid username or password" });
      }

     const user = results[0];

      // Xác thực thành công
      res.json({ message: "Login successful", role: user.role });
    }
   );
};

module.exports = {
  postLogIn,
};
























// import connection from "../config/connecttion";



// const postLogIn = (req, res) => {
//   const { username, password } = req.body;

//   // Lấy thông tin người dùng từ cơ sở dữ liệu
//   connection.query(
//     "SELECT * FROM nguoiDung WHERE username = ?",
//     [username],
//     (err, results) => {
//       if (err) {
//         console.error("Database query error:", err);
//         return res.status(500).json({ message: "Internal Server Error" });
//       }

//       if (results.length === 0) {
//         return res
//           .status(401)
//           .json({ message: "Invalid username or password" });
//       }

//       const user = results[0];

//       // So sánh mật khẩu
//       bcrypt.compare(password, user.matKhau, (err, result) => {
//         if (err || !result) {
//           return res
//             .status(401)
//             .json({ message: "Invalid username or password" });
//         }

//         // Xác thực thành công
//         res.json({ message: "Login successful", role: user.role });
//       });
//     }
//   );
// };
// module.exports = {
//     postLogIn
// }