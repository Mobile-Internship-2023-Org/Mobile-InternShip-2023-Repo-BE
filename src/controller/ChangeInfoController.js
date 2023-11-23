import connection from "../config/connecttion";

// lấy tất cả dữ liệu người dùng
const getAllInfoUser = (req, res) => {
  console.log("get all");
  connection.query(
    "SELECT * FROM nguoidung",
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
};

// lấy dữ liệu người dùng theo email
const getUserByEmail = (req, res) => {
  console.log("get email");
  let query = "select * from nguoidung where email = ?";
  const params = req.params.email;
  connection.query(query, params, (err, result) => {
    if (err) throw err;
    console.log("getUserByEmail", result);
    return res.send(result[0]);
  });
};
// cập nhật người dùng theo email
const updateUserByEmail = (req, res) => {
  console.log("update user");
  let query = "UPDATE nguoidung SET anh = ?,ten = ?, sdt = ?, diachi = ? WHERE email = ?";
  const params = [req.body.anh, req.body.ten, req.body.sdt, req.body.diachi, req.params.email];
  connection.query(query, params, (err, result) => {
    if (err) throw err;
    console.log("updateUserByEmail", result);
    return res.send(result);
  });
};



module.exports = {
  getAllInfoUser,
  getUserByEmail,
  updateUserByEmail
};