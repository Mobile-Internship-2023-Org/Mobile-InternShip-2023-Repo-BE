const connection = require("../config/connecttion");

// lấy tất cả đánh giá
const getAllReviews = (req, res) => {
    const query = "SELECT * FROM danhgia";
    // console.log("Executing query:", query); 

    connection.query(query, (err, result) => {
        if (err) {
            console.error("Error fetching reviews:", err);
            return res.status(500).json({ err: "Không lấy được đánh giá" });
        }

        // console.log("Fetched reviews successfully:", result); 
        res.status(200).json({ reviews: result });
    });
};

// đánh giá theo id
const getReviewById = (req, res) => {
    const id = req.params.id;
    const query = "SELECT * FROM danhgia WHERE idDanhGia = ?";
    connection.query(query, [id], (err, result) => {
      if (err) {
        return res.status(500).json({ err: "Không lấy được đánh giá" });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Đánh giá không tồn tại." });
      }
      res.status(200).json({ review: result[0] });
    });
  };
  const addReview = (req, res) => {
    const { soSao, moTa, idNguoiDung } = req.body;
    const query = "INSERT INTO danhgia (soSao, moTa, idNguoiDung) VALUES (?,?,?)";
    connection.query(query, [soSao, moTa, idNguoiDung], (err, result) => {
      if (err) {
        return res.status(500).json({ err: "Lỗi thêm đánh giá." });
      }
      const newReview = {
        idDanhGia: result.insertId,
        soSao,
        moTa,
        idNguoiDung,
      };
      res.status(200).json({ message: "Thêm đánh giá thành công.", review: newReview });
    });
  };
/**
 * 
 *  Cập nhật
 * 
 */
  const updateReview = (req, res) => {
    const { soSao, moTa } = req.body;
    const idDanhGia = req.params.id;
  
    const query = "UPDATE danhgia SET soSao=?, moTa=? WHERE idDanhGia=?";
    connection.query(query, [soSao, moTa, idDanhGia], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Không thể cập nhật đánh giá." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Đánh giá không tồn tại." });
      }
  
      const updatedReview = {
        idDanhGia,
        soSao,
        moTa,
      };
  
      res.status(200).json({ message: "Cập nhật đánh giá thành công.", review: updatedReview });
    });
  };
  const deleteReview = (req, res) => {
    const idDanhGia = req.params.id;
  
    const query = "DELETE FROM danhgia WHERE idDanhGia=?";
    connection.query(query, [idDanhGia], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Không thể xóa đánh giá." });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Đánh giá không tồn tại." });
      }
      res.status(200).json({ message: "Xóa đánh giá thành công." });
    });
  };
  module.exports = {
    getAllReviews,
    getReviewById,
    addReview,
    updateReview,
    deleteReview
  };