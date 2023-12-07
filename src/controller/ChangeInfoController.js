import connection from "../config/connecttion";

// lấy tất cả dữ liệu người dùng
const getAllInfoUser = (req, res) => {
  console.log("get all");
  connection.query("SELECT * FROM nguoidung", (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
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
  console.log(req.body);
  console.log("update user");
  let query1 =
    "UPDATE nguoidung SET anh = ?,hoTen = ?, sdt = ?, diaChi = ? WHERE email = ?";
  let query2 =
    "UPDATE nguoidung SET hoTen = ?, sdt = ?, diaChi = ? WHERE email = ?";
  const params1 = [
    req.body.anh,
    req.body.hoTen,
    req.body.sdt,
    req.body.diaChi,
    req.params.email,
  ];
  const params2 = [
    req.body.hoTen,
    req.body.sdt,
    req.body.diaChi,
    req.params.email,
  ];
  if (req.body.anh != null) {
    console.log(req.body.anh);
    connection.query(query1, params1, (err, result) => {
      if (err) throw err;
      console.log("updateUserByEmail", result);
      return res.send(result);
    });
  } else {
    connection.query(query2, params2, (err, result) => {
      if (err) throw err;
      console.log("updateUserByEmail", result);
      return res.send(result);
    });
  }
};

module.exports = {
  getAllInfoUser,
  getUserByEmail,
  updateUserByEmail,
};
