const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controller/uercontroller");

const hoadonController = require("../controller/hoaDonController");
const MonAnController = require("../controller/MonAnController");
const ChangeInfoController = require("../controller/ChangeInfoController");
const Nhahangcontroller = require("../controller/Nhahangcontroller");
const Login = require("../controller/Login");
const Register = require("../controller/Register");
const GioHangController = require("../controller/GioHangController");

const hoadonRoutes = require("../service/hoadonRoutes");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const uploadFood = multer({ dest: "uploads/" });

const initRouter = (app) => {
  router.get("/user", userController.getUser);

  // lấy danh sách loại món
  router.get("/listTypeFood", MonAnController.listTypeFood);
  // thêm món ăn mới
  router.post("/addFood", uploadFood.single("anh"), MonAnController.addFood);
  // cập nhật món ăn theo id
  router.put(
    "/updateFood/:idMonAn",
    uploadFood.single("anh"),
    MonAnController.updateFood
  );
  // xóa món ăn theo id
  router.put("/deleteFood/:idMonAn", MonAnController.deleteFood);
  //lấy mon an
  router.get("/monan", MonAnController.getAllFood);
  //lấy món ăn theo thể loại
  router.get("/monanType/:type/:id", MonAnController.getFoodByType);
  //lấy món ăn theo id
  router.get("/monanId/:id", MonAnController.getFoodById);
  // thêm món ăn vào giỏ hàng
  router.post("/addToCart", MonAnController.addToCart);
  //lấy thông tin người dùng theo email
  router.get("/user/:email", userController.getUserByEmail);
  //lấy toàn bộ đánh giá của người dùng
  router.get("/rating", Nhahangcontroller.getRating);
  // Lấy thông tin món ăn
  router.get("/getInfor", GioHangController.getInfor);

  // Lấy thông tin nhà hàng
  router.get("/nhahang", Nhahangcontroller.getNhahang);
  // thêm nhà hàng
  router.post("/addNhahang", Nhahangcontroller.addNhahang);
  // update nhà hàng
  router.put(
    "/updateNhahang",
    upload.single("anh"),
    Nhahangcontroller.updateNhahang
  );

  // lấy tất cả thông tin người dùng
  router.get("/nguoidung", ChangeInfoController.getAllInfoUser);
  // lấy dữ liệu người dùng theo email
  router.get("/user/:email", ChangeInfoController.getUserByEmail);
  // cập nhật người dùng theo email
  router.post("/user/:email", ChangeInfoController.updateUserByEmail);

  //Login
  router.post("/login", Login.postLogIn);
  //Rgister
  router.post("/register", Register.postRegister);
  //lấy món ăn theo giỏ hàng
  router.get("/monan/:idGioHang");

  app.use("/hoadon", hoadonRoutes);

  return app.use("/", router);
};

export default initRouter;
