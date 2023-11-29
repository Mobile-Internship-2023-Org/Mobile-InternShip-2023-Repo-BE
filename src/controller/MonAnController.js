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
    WHERE b.tenTheLoai LIKE '%${req.params.type}%' NOT IN '%${req.params.id}%'`;
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
  //console.log("add to cart");
  let query = `INSERT INTO gioHang VALUES(?)`;
  const params = req.body.cartItem;
  connection.query(query, params, (err, result) => {
    if (err) throw err;
    return res.status(201).end();
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
  getAllFood,
  getFoodById,
  getFoodByType,
  getRating,
  addToCart,
  getFoodByNameRegex,
};
