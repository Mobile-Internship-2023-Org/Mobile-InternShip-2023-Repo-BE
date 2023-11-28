const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controller/uercontroller");
const hoadonController = require("../controller/hoaDonController");
import MonAnController from "../controller/MonAnController";
import ChangeInfoController from "../controller/ChangeInfoController";
import Nhahangcontroller from "../controller/Nhahangcontroller";
import Login from "../controller/Login";
import Register from "../controller/Register";
import GioHangController from "../controller/GioHangController";

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
  // lấy đánh giá
  router.get("/rating", MonAnController.getRating);
  // thêm món ăn vào giỏ hàng
  router.post("/addToCart", MonAnController.addToCart);
  router.get("/user/:email", userController.getUserByEmail);

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

  // Tạo hóa đơn mới
  router.post("/createOrder", hoadonController.createOrder);
  // Tính tổng tiền hóa đơn
  router.post("/calculateTongTienHoaDon", hoadonController.calculateTongTienHoaDon);
  // Add the new 'finalizeOrder' API route
  router.post("/finalizeOrder", hoadonController.finalizeOrder);

  router.get("/getOrderStatus/:idHoaDon", hoadonController.getOrderStatus);

  router.put("/updateOrderStatus/:idHoaDon", hoadonController.updateOrderStatus);

  router.get("/getTotalItems/:idHoaDon", hoadonController.getTotalItems);

  return app.use("/", router);
};

export default initRouter;
