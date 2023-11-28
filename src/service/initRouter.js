const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controller/uercontroller");

const hoadonController = require("../controller/hoadonController");
const MonAnController = require("../controller/MonAnController");
const ChangeInfoController = require("../controller/ChangeInfoController");
const Nhahangcontroller = require("../controller/Nhahangcontroller");
const Login = require("../controller/Login");
const register = require("../controller/Register");
const GioHangController = require("../controller/GioHangController");

const hoadonRoutes = require("../service/hoadonRoutes");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const initRouter = (app) => {
  router.get("/user", userController.getUser);

  // thêm món ăn mới
  router.post("/addFood", MonAnController.addFood);
  // cập nhật món ăn theo id
  router.put("/updateFood/:id", MonAnController.updateFood);
  // xóa món ăn theo id
  router.delete("/deleteFood/:id", MonAnController.deleteFood);
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
  router.get("/:email", ChangeInfoController.getUserByEmail);
  // cập nhật người dùng theo email
  router.get("/updateUser", ChangeInfoController.updateUserByEmail);

  //Login
  router.post("/login", Login.postLogIn);
  //Rgister
  router.post("/register", Register.postRegister);

  app.use("/hoadon", hoadonRoutes);

  return app.use("/", router);
};

export default initRouter;
