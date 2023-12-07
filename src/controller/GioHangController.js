import connection from "../config/connecttion";

// lấy thông tin món ăn
const getInfor = (req, res) => {
  const email = req.params.email;
  console.log("get infor" + email);
  connection.query(
    "select a.soLuong, b.anh, b.ten, b.giaBan from giohang_monan a join monan b on a.idMonAn = b.idMonAn join giohang c on a.idGioHang = c.idGioHang " +
      "join nguoiDung d on c.idNguoiDung = d.idNguoiDung where d.email = ? and c.trangThai = 0",
    [email],
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
};

module.exports = {
  getInfor,
};
