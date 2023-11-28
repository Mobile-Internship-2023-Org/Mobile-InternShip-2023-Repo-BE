const connection = require("../config/connecttion");

const getNhahang = (req, res) => {
  connection.query(" select * from nhahang", (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
};
const addNhahang = async (req, res) => {
  const { anh, ten, sdt, fanpage, diaChi, id } = req.body;

  try {
    const result = await queryAsync(
      "INSERT INTO nhahang (anh, ten, sdt, fanpage, diaChi, id) VALUES (?, ?, ?, ?, ?, ?)",
      [anh, ten, sdt, fanpage, diaChi, id]
    );

    console.log("Data inserted successfully");
    return res.status(200, { result }).send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).send("Error inserting data");
  }
};

const updateNhahang = (req, res) => {
  const { anh, ten, sdt, fanpage, diaChi } = req.body;
  const sql =
    "update nhahang set  anh =?,ten =?, sdt =?, fanpage =?, diaChi =?";

  connection.query(sql, [anh, ten, sdt, fanpage, diaChi], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).send("Error updating data");
    }

    return res.status(200).send("Data updated successfully");
  });
};
//lấy thông tin đánh giá
const getRating = (req, res) => {
  let query =
    "select a.idDanhGia, a.soSao, a.moTa, c.hoTen, c.email, c.anh from danhGia a join nguoiDung c on a.idNguoiDung = c.idNguoiDung";

  connection.execute(query, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
};

module.exports = {
  getNhahang,
  addNhahang,
  updateNhahang,
  getRating,
};
