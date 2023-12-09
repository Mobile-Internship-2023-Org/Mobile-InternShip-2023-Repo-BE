import connection from "../config/connecttion";

// Thống kê doanh thu từ thức ăn trong một ngày
const getDailyRevenue = (req, res) => {
    const date = req.body.date; 
    // Ngày cần thống kê, có thể sử dụng req.params.date nếu truyền ngày qua URL
  
    console.log("get daily revenue");
    connection.query(
      "SELECT SUM(b.giaBan * a.soLuong) AS doanhThu FROM giohang_monan a JOIN monan b ON a.idMonAn = b.idMonAn WHERE DATE(12/8/2023)",
      [date],
      (err, result) => {
        if (err) throw err;
        return res.send(result);
      }
    );
};

module.exports = {
  getDailyRevenue,
};