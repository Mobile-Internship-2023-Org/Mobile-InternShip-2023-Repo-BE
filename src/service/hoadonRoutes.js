const express = require("express");
const router = express.Router();
const hoadonController = require("../controller/hoadonController");

// Create order
router.get("/getNguoiDung/:id", hoadonController.getNguoiDung);
router.get("/getIdGioHang/:id", hoadonController.getIdGioHang);
router.get("/getMonanByNguoiDung/:id", hoadonController.getMonanByNguoiDung);
router.get("/tongTienHoaDon/:id", hoadonController.tongTienHoaDon);
router.post("/createHoadon/:id", hoadonController.createHoadon);
router.get("/getHoadonById/:idHoaDon", hoadonController.getHoadonById);
router.put('/updateTrangThai/:idHoaDon', hoadonController.updateTrangThaiHoadon);
router.get("/getHoadonList/:idNguoiDung", hoadonController.getHoadonList);
router.get("/getNguoiDungByEmail/:email", hoadonController.getNguoiDungByEmail);
router.put('/completeGioHang/:id', hoadonController.completeGioHang);

module.exports = router;