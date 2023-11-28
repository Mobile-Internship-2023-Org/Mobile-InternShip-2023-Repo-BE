import connection from "../config/connecttion";

// Author: Hoàng
// xử lý thêm món ăn, update món ăn, xóa món ăn

// TODO: Thêm món ăn
const addFood = (req, res) => {
  const { anh, ten, giaBan, giaGiam, idTheLoai } = req.body;

  //kiểm tra khi thiếu thông tin
  if (!anh || !ten || !giaBan || !giaGiam || !idTheLoai) {
    return res.status(400).json({ error: "Thiếu thông tin." });
  }

  // truy vấn
  const query = `INSERT INTO monan (anh, ten, giaBan, giaGiam, idTheLoai) VALUES (?,?,?,?,?)`;
  //connect db
  connection.query(
    query,
    [anh, ten, giaBan, giaGiam, idTheLoai],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Lỗi thêm món ăn." });
      }
      const showFood = {
        idMonAn: result.insertId,
        anh,
        ten,
        giaBan,
        giaGiam,
        idTheLoai,
      };
      res
        .status(200)
        .json({ message: "Thêm món ăn thành công.", food: showFood }); // food: hiển thị dữ liệu vừa thêm
    }
  );
};

// TODO: Cập nhật món ăn
const updateFood = (req, res) => {
  const { anh, ten, giaBan, giaGiam, idTheLoai } = req.body;
  const idMonAn = req.params.id;

  //kiểm tra khi thiếu thông tin
  if (!idMonAn || !anh || !ten || !giaBan || !giaGiam || !idTheLoai) {
    return res.status(400).json({ error: "Thiếu thông tin." });
  }

  // truy vấn
  const query = `UPDATE monan SET anh=?, ten=?, giaBan=?, giaGiam=?, idTheLoai=? WHERE idMonAn=?`;
  //connect db
  connection.query(
    query,
    [anh, ten, giaBan, giaGiam, idTheLoai, idMonAn],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Không thể cập nhật." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Món ăn không tồn tại." });
      }

      const showUpdate = {
        idMonAn,
        anh,
        ten,
        giaBan,
        giaGiam,
        idTheLoai,
      };

      res
        .status(200)
        .json({ message: "Cập nhật món ăn thành công.", food: showUpdate });
    }
  );
};

// TODO: Xóa món ăn
const deleteFood = (req, res) => {
  const idMonAn = req.params.id;

  // kiểm tra id
  if (!idMonAn) {
    return res.status(400).json({ error: "Id không tồn tại" });
  }

  // truy vấn
  const query = `DELETE FROM monan WHERE idMonAn=?`;
  //connect db
  connection.query(query, [idMonAn], (error, result) => {
    if (error) {
      return res.status(500).json({ error: "Không thể xóa." });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Món ăn không tồn tại." });
    }
    res.status(200).json({ message: "Xóa món ăn thành công." });
  });
};

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

// thêm món ăn vào giỏ hàng
const addToCart = (req, res) => {
  console.log(req.body);
  const { idMonAn, idNguoiDung, soLuong, trangThai } = req.body;
  let queryInsert = `INSERT INTO gioHang_monan (idGioHang, soLuong, idMonAn) VALUES(?,?,?)`;
  let queryInsertGioHang = `INSERT INTO gioHang (idNguoiDung, trangThai) VALUES(?, ?)`;
  let queryCheck =
    "select a.*, b.idNguoiDung from giohang_monan a join gioHang b where a.idMonAn = ? and b.idNguoiDung = ? and b.trangThai = 1";
  let queryUpdate =
    "update gioHang_monan set soLuong = soLuong + ? where idMonAn = ?";
  connection.execute(queryCheck, [idMonAn, idNguoiDung], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      connection.query(
        queryInsertGioHang,
        [idNguoiDung, trangThai],
        (err, result) => {
          if (err) throw err;
          console.log("them thanh cong");
          let lastInsertedId = result.insertId;
          connection.execute(
            queryInsert,
            [lastInsertedId, soLuong, idMonAn],
            (err, result) => {
              if (err) throw err;
              return res.status(200).end();
            }
          );
        }
      );
    } else {
      console.log(result);
      connection.execute(queryUpdate, [soLuong, idMonAn], (err, result) => {
        if (err) throw err;
        console.log("cap nhat");
        return res.status(200).end();
      });
    }
  });
};

module.exports = {
  addFood,
  updateFood,
  deleteFood,
  getAllFood,
  getFoodById,
  getFoodByType,
  addToCart,
};
