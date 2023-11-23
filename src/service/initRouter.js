const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controller/uercontroller");
import MonAnController from "../controller/MonAnController";
import Nhahangcontroller from "../controller/Nhahangcontroller";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

  return app.use("/", router);
};

export default initRouter;
