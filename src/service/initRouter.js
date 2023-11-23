const express = require("express");
const router = express.Router();
const userController = require("../controller/uercontroller");
import MonAnController from "../controller/MonAnController";
import GioHangController from '../controller/GioHangController'

const initRouter = (app) => {
  router.get("/user", userController.getUser);

  //lấy mon an
  router.get("/monan", MonAnController.getAllFood);
  //lấy món ăn theo thể loại
  router.get("/monanType/:type", MonAnController.getFoodByType);
  //lấy món ăn theo id
  router.get("/monanId/:id", MonAnController.getFoodById);
  //lấy đánh giá
  router.get("/rating", MonAnController.getRating);
  //thêm món ăn vào giỏ hàng
  router.post("/addToCart", MonAnController.addToCart);
  //Lấy thông tin món ăn
  router.get("/getInfor",GioHangController.getInfor);

  return app.use("/", router);
};

export default initRouter;
