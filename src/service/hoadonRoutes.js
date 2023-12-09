const express = require("express");
const router = express.Router();
const hoadonController = require("../controller/hoaDonController");

// Create order
router.get("/getNguoiDung/:id", hoadonController.getNguoiDung);
router.get("/getIdGioHang/:id", hoadonController.getIdGioHang);
router.get("/getMonanByNguoiDung/:id", hoadonController.getMonanByNguoiDung);
router.get("/tongTienHoaDon/:id", hoadonController.tongTienHoaDon);
router.post("/createHoadon/:id", hoadonController.createHoadon);
router.get("/getHoadonById/:idHoaDon", hoadonController.getHoadonById);
router.put(
  "/updateTrangThai/:idHoaDon/:trangThai",
  hoadonController.updateTrangThaiHoadon
);
router.get("/getHoadonList/:email", hoadonController.getHoadonList);
router.get("/getNguoiDungByEmail/:email", hoadonController.getNguoiDungByEmail);

router.put('/completeGioHang/:id', hoadonController.completeGioHang);
router.put('/updateNguoiDungInfo', hoadonController.updateNguoiDungInfo);
router.put("/completeGioHang/:id", hoadonController.completeGioHang);
router.get("/monan/:id", hoadonController.getMonAnByIdGioHang);
router.get("/getHoaDonListAll", hoadonController.getHoadonListAll);

// router.get("/getthongkeAll" , thongkeController.getDailyRevenue);

module.exports = router;
