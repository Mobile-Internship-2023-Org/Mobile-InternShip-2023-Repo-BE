const express = require("express");
const router = express.Router();
const userController = require("../controller/uercontroller");
import MonAnController from "../controller/MonAnController";
import Nhahangcontroller from "../controller/Nhahangcontroller";
import Login from "../controller/Login";
//import Register from "../controller/Register";
import GioHangController from '../controller/GioHangController'

const initRouter = (app) => {
  router.get("/user", userController.getUser);
  //lấy mon an
  router.get("/monan", MonAnController.getAllFood);
  //lấy món ăn theo thể loại
  router.get("/monanType/:type/:id", MonAnController.getFoodByType);
  //lấy món ăn theo id
  router.get("/monanId/:id", MonAnController.getFoodById);
  //lấy đánh giá
  router.get("/rating", MonAnController.getRating);
  //thêm món ăn vào giỏ hàng
  router.post("/addToCart", MonAnController.addToCart);
  //Lấy thông tin món ăn
  router.get("/getInfor",GioHangController.getInfor);
  //Tìm kiếm món ăn
  router.get("/seach",MonAnController.getFoodByNameRegex);
  // Lấy thông tin nhà hàng
  router.get("/nhahang", Nhahangcontroller.getNhahang);
  // thêm nhà hàng
  router.post("/addNhahang", Nhahangcontroller.addNhahang);
  // update nhà hàng
  router.put("/updateNhahang", Nhahangcontroller.updateNhahang);
  //lấy dữ liệu người dùng theo email
  router.get("/user/:email", userController.getUserByEmail);
  //Login
  router.post("/login", Login.postLogIn);
  //Rgister
  //router.post("/register", Register.postRegister);

  return app.use("/", router);
};

export default initRouter;
