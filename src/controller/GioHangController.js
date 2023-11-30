import connection from "../config/connecttion";

// lấy thông tin món ăn
const getInfor = (req, res) => {
  console.log("get infor");
  connection.query(
    "select a.soLuong, b.anh, b.ten, b.giaBan from giohang_monan a join monan b on a.idMonAn = b.idMonAn",
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
};

module.exports = {
  getInfor,
};
