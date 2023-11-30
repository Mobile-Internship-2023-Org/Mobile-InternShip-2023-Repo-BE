import connection from "../config/connecttion";

// API to get nguoidung's info by id
const getNguoiDung = (req, res) => {
  const userId = req.params.id;

  // Query to get information about a user based on their ID
  const query = 'SELECT * FROM nguoidung WHERE idNguoiDung = ?';

  connection.query(query, [userId], (error, results) => {
    if (error) {
      console.error(error);

      // Error response
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      // Check if the user with the given ID exists
      if (results.length === 0) {
        // Error response
        res.status(404).json({ error: 'Không Tìm Thấy Người Dùng' });
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

// API to get associated giohang with trangThai of '0' and return list of all monan with soLuong
const getMonanByNguoiDung = (req, res) => {
  const userId = req.params.id;

  // Query to get the associated giohang with trangThai of '0' for the user
  const giohangQuery = 'SELECT * FROM giohang WHERE idNguoiDung = ? AND trangThai = 0';

  connection.query(giohangQuery, [userId], (error, giohangResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      if (giohangResults.length === 0) {
        // Error response
        res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });
      } else {
        // Get the ID of the found giohang
        const giohangId = giohangResults[0].idGioHang;

        // Query to get all monan with soLuong associated with the found giohang
        const monanQuery = 'SELECT monan.*, giohang_monan.soLuong FROM monan INNER JOIN giohang_monan ON monan.idMonAn = giohang_monan.idMonAn WHERE giohang_monan.idGioHang = ?';

        connection.query(monanQuery, [giohangId], (monanError, monanResults) => {
          if (monanError) {
            console.error(monanError);
            // Error response
            res.status(500).json({ error: 'Lỗi nội bộ của server' });
          } else {
            // Send the list of monan with soLuong associated with the giohang as a JSON response
            res.json(monanResults);

            console.log('monanList:', monanResults);
          }
        });
      }
    }
  });
};

const tongTienHoaDon = (req, res) => {
  const userId = req.params.id;

  // Query to get the associated giohang with trangThai of '0' for the user
  const giohangQuery = 'SELECT * FROM giohang WHERE idNguoiDung = ? AND trangThai = 0';

  connection.query(giohangQuery, [userId], (error, giohangResults) => {
    if (error) {
      console.error(error);
      // Error eespond
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      // Check if gioahng exists
      if (giohangResults.length === 0) {
        // Error response
        res.status(404).json({ error: 'Không tìm thấy giỏ hàng' });
      } else {
        // Get the ID of the first found giohang
        const giohangId = giohangResults[0].idGioHang;

        // Query to get all monan with soLuong associated with the found giohang
        const monanQuery = 'SELECT monan.*, giohang_monan.soLuong FROM monan INNER JOIN giohang_monan ON monan.idMonAn = giohang_monan.idMonAn WHERE giohang_monan.idGioHang = ?';

        connection.query(monanQuery, [giohangId], (monanError, monanResults) => {
          if (monanError) {
            console.error(monanError);
            res.status(500).json({ error: 'Lỗi nội bộ của server' });
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
            console.log('tongTienHoaDon:', totalWithShipping);
          }
        });
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
  const trangThai = '1';
  const tongTienHoaDon = req.body.tongTienHoaDon;
  const comment = req.body.comment;
  const idGioHang = req.body.idGioHang;
  const phuongThucTT = req.body.phuongThucTT;

  // Query to insert a new hoadon
  const insertHoadonQuery = 'INSERT INTO hoadon (idGioHang, idNguoiDung, ngayDat, diaChi, trangThai, tongTienHoaDon, comment, phuongThucTT) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  // Execute the insert hoadon query
  connection.query(insertHoadonQuery, [idGioHang, idNguoiDung, ngayDat, diaChi, trangThai, tongTienHoaDon, comment, phuongThucTT], (insertError, insertResults) => {
    if (insertError) {
      console.error(insertError);
      // Error response
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      // Success response with inserted results
      console.log('Inserted Hoadon:', insertResults);
      res.json({ success: true });
    }
  });
};

const getHoadonById = (req, res) => {
  const idHoaDon = req.params.idHoaDon;

  // Query to get information about the hoadon by idHoaDon
  const hoadonQuery = 'SELECT * FROM hoadon WHERE idHoaDon = ?';

  // Execute the hoadon query
  connection.query(hoadonQuery, [idHoaDon], (error, hoadonResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      // Check if hoadon exists
      if (hoadonResults.length === 0) {
        // Error response
        res.status(404).json({ error: 'Không tìm thấy hoadon' });
      } else {
        // Map trangThai to its corresponding string
        const trangThaiMapping = {
          1: 'Đã đặt',
          2: 'Đang chuẩn bị',
          3: 'Đang giao hàng',
          4: 'Đã hoàn thành',
        };

        // Get the string representation of trangThai
        const trangThaiString = trangThaiMapping[hoadonResults[0].trangThai];

        // Include the string representation in the response
        const hoadonInfo = { ...hoadonResults[0], trangThai: trangThaiString };

        // Success response with hoadon information
        res.json(hoadonInfo);
        console.log('hoaDon:', hoadonInfo);
      }
    }
  });
};

const updateTrangThaiHoadon = (req, res) => {
  const idHoaDon = req.params.idHoaDon;
  const newTrangThai = req.body.newTrangThai;

  // Query to update the trangThai of the hoadon
  const updateTrangThaiQuery = 'UPDATE hoadon SET trangThai = ? WHERE idHoaDon = ?';

  // Execute the update trangThai query
  connection.query(updateTrangThaiQuery, [newTrangThai, idHoaDon], (error, updateResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      // Check if any rows were affected by the update
      if (updateResults.affectedRows === 0) {
        // Error response
        res.status(404).json({ error: 'Không tìm thấy hoadon' });
      } else {
        res.json({ success: true });
      }
    }
  });
};

const getHoadonList = (req, res) => {
  const idNguoiDung = req.params.idNguoiDung;

  // Query to get all hoadon for the nguoidung
  const hoadonQuery = 'SELECT * FROM hoadon WHERE idNguoiDung = ?';

  // Execute the hoadon query
  connection.query(hoadonQuery, [idNguoiDung], (error, hoadonResults) => {
    if (error) {
      console.error(error);
      // Error response
      res.status(500).json({ error: 'Lỗi nội bộ của server' });
    } else {
      // Success response with the list of hoadon
      res.json(hoadonResults.map((hoadon) => ({
        idHoaDon: hoadon.idHoaDon,
        ngayDat: hoadon.ngayDat,
        diaChi: hoadon.diaChi,
        trangThai: getTrangThaiString(hoadon.trangThai),
        tongTienHoaDon: hoadon.tongTienHoaDon,
        comment: hoadon.comment,
        idGioHang: hoadon.idGioHang,
        phuongThucTT: hoadon.phuongThucTT,
      })));
    }
  });
};

// Helper function to map trangThai values to corresponding strings
const getTrangThaiString = (trangThai) => {
  switch (trangThai) {
    case 1:
      return 'Đã đặt';
    case 2:
      return 'Đang chuẩn bị';
    case 3:
      return 'Đang giao hàng';
    case 4:
      return 'Đã hoàn thành';
    default:
      return 'Trạng thái không xác định';
  }
};

module.exports = {
  getNguoiDung,
  getMonanByNguoiDung,
  tongTienHoaDon,
  createHoadon,
  getHoadonById,
  updateTrangThaiHoadon,
  getHoadonList,
};