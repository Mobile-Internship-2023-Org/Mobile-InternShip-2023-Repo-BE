import connection from "../config/connecttion";
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudinaryConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config(cloudinaryConfig);

// Author: Hoàng
// xử lý lấy danh sách loại món ăn, thêm món ăn, cập nhật món ăn, xóa món ăn

// TODO: Lấy danh sách loại món ăn
const listTypeFood = (req, res) => {
  const query = "SELECT * FROM theloai";
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ err: "Không lấy được loại món ăn" });
    }
    res.status(200).json({ types: result });
  });
};

// TODO: Thêm món ăn
const addFood = (req, res) => {
  const { ten, giaBan, giaGiam, idTheLoai } = req.body;
  const { path } = req.file;

  //kiểm tra khi thiếu thông tin
  if (!path || !ten || !giaBan || !giaGiam || !idTheLoai) {
    return res.status(400).json({ error: "Thiếu thông tin." });
  }
  if (isNaN(giaBan) || isNaN(giaGiam)) {
    return res.status(400).json({ error: "Giá không được nhập chữ" });
  }

  // tải ảnh lên Cloundinary
  cloudinary.uploader.upload(path, (error, result) => {
    if (error) {
      return res.status(500).json({ err: "Lỗi tải ảnh lên" });
    }

    // truy vấn
    const query = `INSERT INTO monan (anh, ten, giaBan, giaGiam, idTheLoai) VALUES (?,?,?,?,?)`;
    //connect db
    connection.query(
      query,
      [result.secure_url, ten, giaBan, giaGiam, idTheLoai],
      (err, result) => {
        if (err) {
          return res.status(500).json({ err: "Lỗi thêm món ăn." });
        }
        const showFood = {
          idMonAn: result.insertId,
          anh: result.secure_url,
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
  });
};

// TODO: Cập nhật thông tin món ăn theo ID
const updateFood = (req, res) => {
  const { idMonAn } = req.params; // assuming idMonAn is passed as a URL parameter
  const { ten, giaBan, giaGiam, idTheLoai } = req.body;
  const { file } = req;

  // kiểm tra khi thiếu thông tin
  if (!idMonAn) {
    return res.status(400).json({ error: "Thiếu ID món ăn." });
  }

  // tạo câu truy vấn cập nhật dựa trên các trường được cung cấp
  let updateFields = [];
  let updateValues = [];

  if (ten) {
    updateFields.push("ten = ?");
    updateValues.push(ten);
  }

  if (giaBan) {
    if (isNaN(giaBan)) {
      return res.status(400).json({ error: "Giá bán không được nhập chữ" });
    }
    updateFields.push("giaBan = ?");
    updateValues.push(giaBan);
  }

  if (giaGiam) {
    if (isNaN(giaGiam)) {
      return res.status(400).json({ error: "Giá giảm không được nhập chữ" });
    }
    updateFields.push("giaGiam = ?");
    updateValues.push(giaGiam);
  }

  if (idTheLoai) {
    updateFields.push("idTheLoai = ?");
    updateValues.push(idTheLoai);
  }

  // kiểm tra nếu có ảnh được cung cấp
  if (file && file.path) {
    // tải ảnh lên Cloudinary
    cloudinary.uploader.upload(file.path, (error, result) => {
      if (error) {
        return res.status(500).json({ err: "Lỗi tải ảnh lên" });
      }

      updateFields.push("anh = ?");
      updateValues.push(result.secure_url);

      // gọi hàm thực hiện cập nhật
      performUpdate();
    });
  } else {
    // không có ảnh được cung cấp, gọi hàm thực hiện cập nhật ngay
    performUpdate();
  }

  // hàm thực hiện cập nhật trong trường hợp không có lỗi ảnh
  function performUpdate() {
    // kiểm tra nếu không có trường nào được cập nhật
    if (updateFields.length === 0) {
      return res
        .status(400)
        .json({ error: "Không có trường nào được cập nhật" });
    }

    // tạo câu truy vấn cập nhật cuối cùng
    const query = `UPDATE monan SET ${updateFields.join(
      ", "
    )} WHERE idMonAn = ?`;

    // thực hiện truy vấn cập nhật
    connection.query(query, [...updateValues, idMonAn], (err, result) => {
      console.log("Error: " + err);
      console.log("result: " + result);
      if (err) {
        return res.status(500).json({ error: "Lỗi cập nhật món ăn." });
      }

      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "Không tìm thấy món ăn để cập nhật" });
      }

      res.status(200).json({ message: "Cập nhật món ăn thành công." });
    });
  }
};

// TODO: Xóa món ăn
const deleteFood = (req, res) => {
  const idMonAn = req.params.idMonAn;

  // kiểm tra id
  if (!idMonAn) {
    return res.status(400).json({ error: "Id không tồn tại" });
  }

  // truy vấn
  const query = `UPDATE monan SET isHidden = true WHERE idMonAn=?`;

  // connect db
  connection.query(query, [idMonAn], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ error: "Không thể xóa món ăn." });
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
    "select a.*, b.tenTheLoai from monan a join theloai b on a.idTheLoai = b.idTheLoai where a.isHidden = 0",
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
  let query = `SELECT a.*, b.tenTheLoai FROM monan a JOIN theloai b ON a.idTheLoai=b.idTheLoai
    WHERE b.idTheLoai LIKE '%${req.params.type}%' and a.idMonAn NOT IN ('%${req.params.id}%') and isHidden = 0`;
  connection.query(query, (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
};

// thêm món ăn vào giỏ hàng
const addToCart = (req, res) => {
  const { idMonAn, idNguoiDung, soLuong } = req.body;

  const queryInsertGioHang = `INSERT INTO giohang (idNguoiDung, trangThai) VALUES (?, ?)`;
  const queryCheckGioHang = `SELECT idGioHang FROM giohang WHERE idNguoiDung = ? AND trangThai = 0`;
  const queryCheck = `SELECT * FROM giohang_monan a JOIN giohang b on a.idGioHang = b.idGioHang  WHERE idMonAn = ? and trangThai = 0`;
  const queryUpdate = `UPDATE giohang_monan SET soLuong = soLuong + ? WHERE idMonAn = ?`;
  const queryInsert = `INSERT INTO giohang_monan (idGioHang, soLuong, idMonAn) VALUES (?, ?, ?)`;

  connection.execute(queryCheckGioHang, [idNguoiDung], (err, result) => {
    if (err) {
      throw err;
    }

    if (result.length === 1) {
      const id = result[0].idGioHang;
      connection.query(queryCheck, [idMonAn], (err, result) => {
        if (err) {
          throw err;
        }

        console.log("Thêm thành công");
        console.log(result);
        console.log(result.length);

        if (result.length === 1) {
          connection.execute(queryUpdate, [soLuong, idMonAn], (err, result) => {
            if (err) {
              throw err;
            }
            return res.status(200).json({ message: "success", data: result });
          });
        } else {
          connection.execute(
            queryInsert,
            [id, soLuong, idMonAn],
            (err, result) => {
              if (err) {
                throw err;
              }
              res.status(200).json({ message: "thành công", data: result });
            }
          );
        }
      });
    } else {
      console.log(result);
      connection.execute(
        queryInsertGioHang,
        [idNguoiDung, 0],
        (err, result) => {
          if (err) {
            throw err;
          }
          const insertID = result.insertId;
          connection.execute(
            queryInsert,
            [insertID, soLuong, idMonAn],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.status(200).json({ message: "thành công", data: results });
            }
          );
        }
      );
    }
  });
};

//tìm kiếm món ăn
const getFoodByNameRegex = (req, res) => {
  console.log("get name regex");

  const searchTerm = req.query.ten ? req.query.ten.trim().toLowerCase() : "";

  // Sử dụng biểu thức chính quy để tìm kiếm chính xác từ khóa
  let query = "SELECT * FROM monan WHERE LOWER(ten) REGEXP ?";

  connection.query(query, [`\\b${searchTerm}\\b`], (err, result) => {
    if (err) throw err;

    console.log("getFoodByNameRegex", result);
    return res.send(result);
  });
};

module.exports = {
  listTypeFood,
  addFood,
  updateFood,
  deleteFood,
  getAllFood,
  getFoodById,
  getFoodByType,
  addToCart,
  getFoodByNameRegex,
};
