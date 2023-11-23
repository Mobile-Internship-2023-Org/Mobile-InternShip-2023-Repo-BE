const connection = require("../config/connecttion");

const getNhahang = (req, res) => {
  connection.query(" select * from nhahang", (err, result) => {
    if (err) throw err;
    return res.send(result);
  });
};
const addNhahang = async (req, res) => {
  const { anh, ten, sdt, fanpage, diaChi } = req.body;

  try {
    const result = await queryAsync(
      "INSERT INTO nhahang (anh, ten, sdt, fanpage, diaChi) VALUES (?, ?, ?, ?, ?)",
      [anh, ten, sdt, fanpage, diaChi]
    );

    console.log("Data inserted successfully");
    return res.status(200, { result }).send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error);
    return res.status(500).send("Error inserting data");
  }
};

const updateNhahang = (req, res) => {
  const { anh, sdt, fanpage, diaChi, ten } = req.body;

  const sql =
    "UPDATE nhahang SET anh=?, sdt=?, fanpage=?, diaChi=? WHERE ten=?";

  connection.query(sql, [anh, sdt, fanpage, diaChi, ten], (err, result) => {
    if (err) {
      console.error("Error updating data:", err);
      return res.status(500).send("Error updating data");
    }

    if (result.affectedRows === 0) {
      // No rows were affected, meaning the restaurant with the given name does not exist
      return res.status(404).send("Restaurant not found");
    }

    return res.status(200).send("Data updated successfully");
  });
};

module.exports = {
  getNhahang,
  addNhahang,
  updateNhahang,
};
