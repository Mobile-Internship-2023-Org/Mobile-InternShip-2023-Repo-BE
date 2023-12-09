import connection from "../config/connecttion";

// API to get nguoidung's info by id
const getNguoiDung = (req, res) => {
  const userId = req.params.id;

  // Query to get information about a user based on their ID
  const query = "SELECT * FROM nguoidung WHERE idNguoiDung = ?";

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error(error);

      // Error response
      res.status(500).json({ error: "Lỗi nội bộ của server" });
    } else {
      // Check if the user with the given ID exists
      if (results.length === 0) {
        // Error response
        res.status(404).json({ error: "Không Tìm Thấy Người Dùng" });
      } else {
        // JSON response
        const userInfo = results[0];
        res.json({
          id: userInfo.idNguoiDung,
          email: userInfo.email,
          hoTen: userInfo.hoTen,
          sdt: userInfo.sdt,
          anh: userInfo.anh,
          diaChi: userInfo.diaChi,
          role: userInfo.role,
        });
      }
    }
  });
};

const getIdGioHang = (req, res) => {
  const idNguoiDung = req.params.id;

  // Query to get the associated giohang with trangThai of '0' for the user
  const giohangQuery =
    "SELECT idGioHang FROM giohang WHERE idNguoiDung = ? AND trangThai = 0";

  connection.query(giohangQuery, [idNguoiDung], (error, results) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: "Internal server error" });
    } else {
      if (results.length === 0) {
        // No matching giohang found
        res.json({ idGioHang: null });
      } else {
        // Get the ID of the found giohang
        const idGioHang = results[0].idGioHang;

        // Send the idGioHang as a JSON response
        res.json({ idGioHang });

        console.log("idGioHang:", idGioHang);
      }
    }
  });
};

// API to get associated giohang with trangThai of '0' and return list of all monan with soLuong
const getMonanByNguoiDung = (req, res) => {
  const userId = req.params.id;

  // Query to get the associated giohang with trangThai of '0' for the user
  const giohangQuery =
    "SELECT * FROM giohang WHERE idNguoiDung = ? AND trangThai = 0";

  connection.query(giohangQuery, [userId], (error, giohangResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: "Lỗi nội bộ của server" });
    } else {
      if (giohangResults.length === 0) {
        // Error response
        res.status(404).json({ error: "Không tìm thấy giỏ hàng" });
      } else {
        // Get the ID of the found giohang
        const giohangId = giohangResults[0].idGioHang;

        // Query to get all monan with soLuong associated with the found giohang
        const monanQuery =
          "SELECT monan.*, giohang_monan.soLuong FROM monan INNER JOIN giohang_monan ON monan.idMonAn = giohang_monan.idMonAn WHERE giohang_monan.idGioHang = ?";

        connection.query(
          monanQuery,
          [giohangId],
          (monanError, monanResults) => {
            if (monanError) {
              console.error(monanError);
              // Error response
              res.status(500).json({ error: "Lỗi nội bộ của server" });
            } else {
              // Send the list of monan with soLuong associated with the giohang as a JSON response
              res.json(monanResults);

              console.log("monanList:", monanResults);
            }
          }
        );
      }
    }
  });
};

const tongTienHoaDon = (req, res) => {
  const userId = req.params.id;

  // Query to get the associated giohang with trangThai of '0' for the user
  const giohangQuery =
    "SELECT * FROM giohang WHERE idNguoiDung = ? AND trangThai = 0";

  connection.query(giohangQuery, [userId], (error, giohangResults) => {
    if (error) {
      console.error(error);
      // Error eespond
      res.status(500).json({ error: "Lỗi nội bộ của server" });
    } else {
      // Check if gioahng exists
      if (giohangResults.length === 0) {
        // Error response
        res.status(404).json({ error: "Không tìm thấy giỏ hàng" });
      } else {
        // Get the ID of the first found giohang
        const giohangId = giohangResults[0].idGioHang;

        // Query to get all monan with soLuong associated with the found giohang
        const monanQuery =
          "SELECT monan.*, giohang_monan.soLuong FROM monan INNER JOIN giohang_monan ON monan.idMonAn = giohang_monan.idMonAn WHERE giohang_monan.idGioHang = ?";

        connection.query(
          monanQuery,
          [giohangId],
          (monanError, monanResults) => {
            if (monanError) {
              console.error(monanError);
              res.status(500).json({ error: "Lỗi nội bộ của server" });
            } else {
              // Calculate the total amount of the giohang
              const totalAmount = monanResults.reduce((total, monan) => {
                // Calculate the total for each monan based on soLuong and giaBan
                const monanTotal = monan.soLuong * monan.giaBan;
                return total + monanTotal;
              }, 0);

              // Add the shipping fee
              const totalWithShipping = totalAmount + 15000;

              // JSON response
              res.json({ tongTien: totalWithShipping });
              console.log("tongTienHoaDon:", totalWithShipping);
            }
          }
        );
      }
    }
  });
};

const createHoadon = (req, res) => {
  const idNguoiDung = req.params.id;

  // Calculate ngayDat as the current date time + 30 minutes
  const ngayDat = new Date();
  ngayDat.setMinutes(ngayDat.getMinutes() + 30);

  const diaChi = req.body.diaChi;
  const trangThai = "1";
  const tongTienHoaDon = req.body.tongTienHoaDon;
  const comment = req.body.comment;
  const idGioHang = req.body.idGioHang;
  const phuongThucTT = req.body.phuongThucTT;

  // Query to insert a new hoadon
  const insertHoadonQuery =
    "INSERT INTO hoadon (idGioHang, idNguoiDung, ngayDat, diaChi, trangThai, tongTienHoaDon, comment, phuongThucTT) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  // Execute the insert hoadon query
  connection.query(
    insertHoadonQuery,
    [
      idGioHang,
      idNguoiDung,
      ngayDat,
      diaChi,
      trangThai,
      tongTienHoaDon,
      comment,
      phuongThucTT,
    ],
    (insertError, insertResults) => {
      if (insertError) {
        console.error(insertError);
        // Error response
        res.status(500).json({ error: "Lỗi nội bộ của server" });
      } else {
        // Success response with inserted results
        console.log("Inserted Hoadon:", insertResults);
        res.json({ success: true });
      }
    }
  );
};

const getHoadonById = (req, res) => {
  const idHoaDon = req.params.idHoaDon;

  // Query to get information about the hoadon by idHoaDon
  const hoadonQuery =
    "SELECT a.*, b.hoTen, b.sdt FROM hoadon a join nguoiDung b on a.idNguoiDung = b.idNguoiDung WHERE a.idHoaDon = ? ";

  // Execute the hoadon query
  connection.query(hoadonQuery, [idHoaDon], (error, hoadonResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: "Lỗi nội bộ của server" });
    } else {
      // Check if hoadon exists
      if (hoadonResults.length === 0) {
        // Error response
        res.status(404).json({ error: "Không tìm thấy hoadon" });
      } else {
        // Map trangThai to its corresponding string
        const trangThaiMapping = {
          1: "Đã đặt",
          2: "Đang giao hàng",
          3: "Đã hoàn thành",
          4: "Hủy đơn",
        };

        // Get the string representation of trangThai
        const trangThaiString = trangThaiMapping[hoadonResults[0].trangThai];

        // Include the string representation in the response
        const hoadonInfo = { ...hoadonResults[0], trangThai: trangThaiString };

        // Success response with hoadon information
        res.json(hoadonInfo);
        console.log("hoaDon:", hoadonInfo);
      }
    }
  });
};

const updateTrangThaiHoadon = (req, res) => {
  const idHoaDon = req.params.idHoaDon;
  const newTrangThai = req.params.trangThai;

  // Query to update the trangThai of the hoadon
  const updateTrangThaiQuery =
    "UPDATE hoadon SET trangThai = ? WHERE idHoaDon = ?";

  // Execute the update trangThai query
  connection.query(
    updateTrangThaiQuery,
    [newTrangThai, idHoaDon],
    (error, updateResults) => {
      if (error) {
        console.error(error);
        // Error response
        res.status(500).json({ error: "Lỗi nội bộ của server" });
      } else {
        // Check if any rows were affected by the update
        if (updateResults.affectedRows === 0) {
          // Error response
          res.status(404).json({ error: "Không tìm thấy hoadon" });
        } else {
          res.json({ success: true });
        }
      }
    }
  );
};

const getHoadonList = (req, res) => {
  const idNguoiDung = req.params.email;

  // Query to get all hoadon for the nguoidung
  const hoadonQuery =
    "SELECT a.* FROM hoadon a join nguoiDung b on a.idNguoiDung = b.idNguoiDung WHERE email = ? order by a.ngayDat DESC";

  // Execute the hoadon query
  connection.query(hoadonQuery, [idNguoiDung], (error, hoadonResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: "Lỗi nội bộ của server" });
    } else {
      // Success response with the list of hoadon
      res.json(
        hoadonResults.map((hoadon) => ({
          idHoaDon: hoadon.idHoaDon,
          ngayDat: hoadon.ngayDat,
          diaChi: hoadon.diaChi,
          trangThai: getTrangThaiString(hoadon.trangThai),
          tongTienHoaDon: hoadon.tongTienHoaDon,
          comment: hoadon.comment,
          idGioHang: hoadon.idGioHang,
          phuongThucTT: hoadon.phuongThucTT,
        }))
      );
    }
  });
};

// Helper function to map trangThai values to corresponding strings
const getTrangThaiString = (trangThai) => {
  switch (trangThai) {
    case 1:
      return "Đã đặt";
    case 2:
      return "Đang giao hàng";
    case 3:
      return "Đã hoàn thành";
    case 4:
      return "Hủy đơn";
    default:
      return "Trạng thái không xác định";
  }
};

// API to get info of a nguoidung using email
const getNguoiDungByEmail = (req, res) => {
  // Extract email from request parameters
  const email = req.params.email;

  // Query to get information of a nguoidung based on email
  const query = "SELECT * FROM nguoidung WHERE email = ?";

  // Execute the query
  connection.query(query, [email], (error, results) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: "Lỗi nội bộ của server" });
    } else {
      // Check if there is a user with the provided email
      if (results.length === 0) {
        // User not found response
        res
          .status(404)
          .json({ error: "Không tìm thấy người dùng với email này" });
      } else {
        // Success response with information of the nguoidung
        const nguoidungInfo = results[0];
        res.json(nguoidungInfo);
      }
    }
  });
};

const completeGioHang = (req, res) => {
  const idGioHang = req.params.id;

  // Query to update trangThai of the specified giohang
  const giohangQuery = "UPDATE giohang SET trangThai = 1 WHERE idGioHang = ?";

  connection.query(giohangQuery, [idGioHang], (error, results) => {
    if (error) {
      console.error(error);
      // Error response

      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (results.affectedRows === 0) {
        // No matching giohang found or trangThai already set to '1'
        res.json({ success: false, message: 'No matching giohang found or trangThai already set to 1' });
      } else {
        // Successfully updated trangThai to '1'
        res.json({ success: true, message: 'Giohang trangThai updated to 1' });

        // You can log the success or handle it as needed
        console.log('Giohang trangThai updated to 1');
      }
    }
  });
};

// API to update 'hoTen' and 'sdt' of a nguoidung using email
const updateNguoiDungInfo = (req, res) => {
  const { email, hoTen, sdt } = req.body;

  const query = 'UPDATE nguoidung SET hoTen = ?, sdt = ? WHERE email = ?';

  connection.query(query, [hoTen, sdt, email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Không tìm thấy người dùng với email này' });
      } else {
        res.json({ message: 'Cập nhật thông tin người dùng thành công' });
      }


const getMonAnByIdGioHang = (req, res) => {
  let id = req.params.id;
  console.log(id);
  let query =
    "select c.ten, b.soLuong, c.giaBan from giohang a join giohang_monan b on a.idGioHang = b.idGioHang join monan c on b.idMonAn = c.idMonAn where a.idGioHang = ?";
  connection.query(query, [id], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

const getHoadonListAll = (req, res) => {
  // Query to get all hoadon for the nguoidung
  const hoadonQuery = "SELECT a.* FROM hoadon a  order by a.ngayDat DESC";

  // Execute the hoadon query
  connection.query(hoadonQuery, (error, hoadonResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: "Lỗi nội bộ của server" });
    } else {
      // Success response with the list of hoadon
      res.json(
        hoadonResults.map((hoadon) => ({
          idHoaDon: hoadon.idHoaDon,
          ngayDat: hoadon.ngayDat,
          diaChi: hoadon.diaChi,
          trangThai: getTrangThaiString(hoadon.trangThai),
          tongTienHoaDon: hoadon.tongTienHoaDon,
          comment: hoadon.comment,
          idGioHang: hoadon.idGioHang,
          phuongThucTT: hoadon.phuongThucTT,
        }))
      );

    }
  });
};

module.exports = {
  getNguoiDung,
  getIdGioHang,
  getMonanByNguoiDung,
  tongTienHoaDon,
  createHoadon,
  getHoadonById,
  updateTrangThaiHoadon,
  getHoadonList,
  getNguoiDungByEmail,
  completeGioHang,
  updateNguoiDungInfo
  getMonAnByIdGioHang,
  getHoadonListAll,
};
