import connection from "../config/connecttion";

// lấy tất cả dữ liệu món ăn
const getAllFood = (req, res) => {
  console.log("get all");
  connection.query(
    "select a.*, b.tenTheLoai from monAn a join theLoai b on a.idTheLoai = b.idTheLoai",
    (err, result) => {
      if (err) throw err;
      return res.send(result);
    }
  );
};

// lấy dữ liệu món ăn theo id
const getFoodById = (req, res) => {
  console.log("get id");
  let query = "select * from monan where idMonAn = ?";
  const params = req.params.id;
  connection.query(query, params, (err, result) => {
    if (err) throw err;
    console.log("getFoodById", result);
    return res.send(result[0]);
  });
};

//lấy các món ăn theo thể loại
const getFoodByType = (req, res) => {
  console.log("get type");
  let query = `SELECT a.*, b.tenTheLoai FROM monAn a JOIN theLoai b ON a.idTheLoai=b.idTheLoai
    WHERE b.idTheLoai LIKE '%${req.params.type}%' and a.idMonAn NOT IN ('%${req.params.id}%')`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
};

//lấy dữ liệu đánh giá
const getRating = (req, res) => {
  let query = `SELECT AVG(a.SoSaoo) as danhgia FROM rating a JOIN monAn
    b ON a.idMonAn = b.id WHERE b.id = ${req.params.foodId}`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    return res.json({ rating: result });
  });
};

// thêm món ăn vào giỏ hàng
const addToCart = (req, res) => {
  console.log(req.body);
  const { idMonAn, idNguoiDung, soLuong, trangThai } = req.body;
  let query = `INSERT INTO gioHang (soLuong, idMonAn, idNguoiDung, trangThai) VALUES(?,?,?,?)`;
  let queryCheck =
    "select * from giohang where idMonAn = ? and idNguoiDung = ? and trangThai = 1";
  let queryUpdate =
    "update gioHang set soLuong = soLuong + ? where idMonAn = ?";
  connection.execute(queryCheck, [idMonAn, idNguoiDung], (err, result) => {
    if (err) throw err;
    if (result.affectedRows == 0) {
      connection.query(
        query,
        [soLuong, idMonAn, idNguoiDung, trangThai],
        (err, result) => {
          if (err) throw err;
          return res.status(200).end();
        }
      );
    } else {
      connection.execute(queryUpdate, [soLuong, idMonAn], (err, result) => {
        if (err) throw err;
        return res.status(200).end();
      });
    }
  });
};

module.exports = {
  getAllFood,
  getFoodById,
  getFoodByType,
  getRating,
  addToCart,
};
