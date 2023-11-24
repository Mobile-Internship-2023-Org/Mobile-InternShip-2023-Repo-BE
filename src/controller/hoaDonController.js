import connection from "../config/connecttion";

const createOrder = (req, res) => {
  try {
    // Extract necessary data from the request body
    const { idNguoiDung, idGioHang } = req.body;

    // Calculate the current time as ngayDat
    const ngayDat = new Date();

    // Insert a new hoadon record into the database
    const insertQuery = `
      INSERT INTO hoadon (idGioHang, idNguoiDung, ngayDat, trangThai)
      VALUES (?, ?, ?, 1)
    `;
    
    // Execute the query
    connection.execute(insertQuery, [idGioHang, idNguoiDung, ngayDat], (err, result) => {
      if (err) {
        console.error("Error creating new hoadon:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Return the newly created hoadon id
      res.status(201).json({ message: "New hoadon created successfully", hoadonId: result.insertId });
    });
  } catch (error) {
    console.error("Error in createOrder:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderStatus = (req, res) => {
  try {
    // Extract the idHoaDon from the request parameters
    const { idHoaDon } = req.params;

    // Query to retrieve the trangThai (status) of the specified hoadon
    const getStatusQuery = `
      SELECT trangThai
      FROM hoadon
      WHERE idHoaDon = ?
    `;

    // Execute the query
    connection.execute(getStatusQuery, [idHoaDon], (err, result) => {
      if (err) {
        console.error("Error retrieving hoadon status:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Check if the idHoaDon exists in the database
      if (result.length === 0) {
        res.status(404).json({ error: "Hoadon not found" });
      } else {
        // Return the trangThai (status) of the hoadon as a string
        const trangThai = getStatusString(result[0].trangThai);
        res.status(200).json({ trangThai });
      }
    });
  } catch (error) {
    console.error("Error in getOrderStatus:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOrderStatus = (req, res) => {
  try {
    // Extract the idHoaDon and new trangThai from the request parameters
    const { idHoaDon } = req.params;
    const { newTrangThai } = req.body;

    // Check if newTrangThai is a valid status code (1, 2, 3, or 4)
    if (![1, 2, 3, 4].includes(newTrangThai)) {
      res.status(400).json({ error: "Invalid status code. It should be 1, 2, 3, or 4." });
      return;
    }

    // Update the trangThai of the specified hoadon
    const updateStatusQuery = `
      UPDATE hoadon
      SET trangThai = ?
      WHERE idHoaDon = ?
    `;

    // Execute the query
    connection.execute(updateStatusQuery, [newTrangThai, idHoaDon], (err, result) => {
      if (err) {
        console.error("Error updating hoadon status:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Check if the hoadonId exists in the database
      if (result.affectedRows === 0) {
        res.status(404).json({ error: "Hoadon not found" });
      } else {
        // Return a success message
        res.status(200).json({ message: "Hoadon status updated successfully" });
      }
    });
  } catch (error) {
    console.error("Error in updateOrderStatus:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Function to map status codes to strings
const getStatusString = (statusCode) => {
  const statusMapping = {
    1: 'Đã đặt đơn',
    2: 'Đang chuẩn bị món ăn',
    3: 'Đang giao',
    4: 'Đã giao',
  };

  return statusMapping[statusCode] || 'Unknown Status';
};

const getTotalItems = (req, res) => {
  try {
    // Extract the idHoaDon from the request parameters
    const { idHoaDon } = req.params;

    // Query to retrieve the amount, total amount, and price of monan connected to a giohang connected to the specified hoadon
    const getTotalItemsQuery = `
      SELECT m.idMonAn, m.ten AS tenMonAn, COUNT(g.idMonAn) AS amount, m.giaBan AS price
      FROM giohang g
      JOIN monan m ON g.idMonAn = m.idMonAn
      WHERE g.idGioHang IN (
        SELECT idGioHang
        FROM hoadon
        WHERE idHoaDon = ?
      )
      GROUP BY m.idMonAn
    `;

    // Execute the query
    connection.execute(getTotalItemsQuery, [idHoaDon], (err, result) => {
      if (err) {
        console.error("Error retrieving total items:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      // Check if the idHoaDon exists in the database
      if (result.length === 0) {
        res.status(404).json({ error: "Hoadon not found" });
      } else {
        // Calculate total amount and total price
        const totalAmount = result.reduce((acc, item) => acc + item.amount, 0);
        const totalPrice = result.reduce((acc, item) => acc + item.amount * item.price, 0);

        // Return the total items
        res.status(200).json({
          totalAmount,
          totalPrice,
          items: result.map(item => `${item.amount}x ${item.tenMonAn} - ${item.price}`),
        });
      }
    });
  } catch (error) {
    console.error("Error in getTotalItems:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// API to calculate 'tongTienHoaDon'
const calculateTongTienHoaDon = (req, res) => {
  const { idGioHang } = req.body;

  // Query to calculate the total cost (tongTienHoaDon) for the given giohang
  const calculateQuery = `
    SELECT SUM(m.giaBan) + 15000 AS tongTienHoaDon
    FROM giohang g
    JOIN monan m ON g.idMonAn = m.idMonAn
    WHERE g.idGioHang = ?
  `;

  connection.execute(calculateQuery, [idGioHang], (err, result) => {
    if (err) {
      console.error("Error calculating tongTienHoaDon:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return the calculated tongTienHoaDon
    res.status(200).json({ tongTienHoaDon: result[0].tongTienHoaDon });
  });
};

// API to finalize an order
const finalizeOrder = (req, res) => {
  const { hoadonId, diaChi, estimatedDeliveryTime } = req.body;

  // Update the hoadon record with the final details
  const updateQuery = `
    UPDATE hoadon
    SET diaChi = ?, trangThai = 2, thoiGianGiaoHangDuKien = ?
    WHERE idHoaDon = ?
  `;

  connection.execute(updateQuery, [diaChi, estimatedDeliveryTime, hoadonId], (err) => {
    if (err) {
      console.error("Error finalizing order:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    // Return a success message
    res.status(200).send("Order finalized successfully");
  });
};

module.exports = {
  createOrder,
  getOrderStatus,
  updateOrderStatus,
  getTotalItems,
  calculateTongTienHoaDon,
  finalizeOrder,
};