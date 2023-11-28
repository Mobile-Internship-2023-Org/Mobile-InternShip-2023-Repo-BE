-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2023 at 04:43 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foody`
--

-- --------------------------------------------------------

--
-- Table structure for table `danhgia`
--

CREATE TABLE `danhgia` (
  `idDanhGia` int(11) NOT NULL,
  `soSao` int(11) NOT NULL,
  `moTa` varchar(255) DEFAULT NULL,
  `idNguoiDung` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `danhgia`
--

INSERT INTO `danhgia` (`idDanhGia`, `soSao`, `moTa`, `idNguoiDung`) VALUES
(30, 4, 'Đồ ăn ngon', 7),
(31, 3, 'Đồ ăn không hợp khẩu vị lắm', 3);

-- --------------------------------------------------------

--
-- Table structure for table `giohang`
--

CREATE TABLE `giohang` (
  `idGioHang` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `trangThai` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `giohang`
--

INSERT INTO `giohang` (`idGioHang`, `idNguoiDung`, `trangThai`) VALUES
(1, 14, 1),
(2, 14, 1);

-- --------------------------------------------------------

--
-- Table structure for table `giohang_monan`
--

CREATE TABLE `giohang_monan` (
  `idGioHang` int(11) NOT NULL,
  `idMonAn` int(11) NOT NULL,
  `soLuong` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `giohang_monan`
--

INSERT INTO `giohang_monan` (`idGioHang`, `idMonAn`, `soLuong`) VALUES
(1, 1, 2),
(2, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `idHoaDon` int(11) NOT NULL,
  `ngayDat` datetime NOT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `trangThai` int(11) NOT NULL,
  `tongTienHoaDon` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `idGioHang` int(11) NOT NULL,
  `phuongThucTT` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `monan`
--

CREATE TABLE `monan` (
  `idMonAn` int(11) NOT NULL,
  `anh` longtext DEFAULT NULL,
  `ten` varchar(255) NOT NULL,
  `giaGoc` int(11) NOT NULL,
  `giaBan` int(11) NOT NULL,
  `giaGiam` int(11) DEFAULT NULL,
  `idTheLoai` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `monan`
--

INSERT INTO `monan` (`idMonAn`, `anh`, `ten`, `giaGoc`, `giaBan`, `giaGiam`, `idTheLoai`) VALUES
(1, 'https://yummyday.vn/uploads/images/banh-mi-cha-2.jpg', 'Bánh mì thịt chả', 0, 15000, NULL, 1),
(2, 'https://vinafood.net/dac-san/Cache/Uploads/vinafood/2020/cha-ca-vung-tau-ban-banh-mi.jpg', 'Bánh mì cá sẵn', 0, 18000, NULL, 1),
(3, 'https://images.foody.vn/res/g99/986667/prof/s576x330/foody-upload-api-foody-mobile-14-191218150211.jpg', 'Bánh mì bò nướng', 0, 17000, NULL, 1),
(4, 'https://img-global.cpcdn.com/recipes/01914f4be6cc4786/1200x630cq70/photo.jpg', 'Bánh mì trứng', 0, 16000, NULL, 1),
(5, 'https://xebanhmithonhiky.vn/wp-content/uploads/2022/02/quan-golden-corner-1.jpeg', 'Bánh mì kem', 0, 19000, NULL, 1),
(6, 'https://images.foody.vn/res/g95/946880/prof/s576x330/foody-upload-api-foody-mobile-bam-190809113019.jpg', 'Bánh mì xôi', 0, 14000, NULL, 1),
(7, 'https://i.imgur.com/wSbtz6z.png', 'Burger trứng', 20000, 25000, NULL, 2),
(8, 'https://i.imgur.com/JJHkb8b.png', 'Burger gà rán', 24000, 30000, NULL, 2),
(9, 'https://i.imgur.com/Lu9Kqr0.png', 'Burger bò', 28000, 35000, NULL, 2),
(10, 'https://cdn.tgdd.vn/Products/Images/2443/125398/bhx/6-lon-nuoc-ngot-coca-cola-320ml-202304131108497884.jpg', 'Coca cola', 12000, 15000, NULL, 3),
(11, 'https://www.coca-cola.com/content/dam/onexp/vn/home-image/fanta/Fanta_Orange_RCG_320ml_Desktop.png', 'Fanta', 12000, 15000, NULL, 3),
(12, 'https://product.hstatic.net/1000141988/product/nuoc_ngot_sprite_330_ml_36218b2593804919860644198e59fa1c.jpg', 'Sprite', 12000, 15000, NULL, 3),
(13, 'https://nuocuongtruongphat.com/wp-content/uploads/2020/10/VICTORY.jpg', 'Nước suối', 8000, 10000, NULL, 3),
(14, 'https://cdn.tgdd.vn/Files/2020/02/19/1237375/cach-lam-pizza-xuc-xich-lop-vo-day-gion-thom-202002190905475792.jpg', 'Pizza xúc xích', 28000, 35000, NULL, 4),
(15, 'https://cdn.tgdd.vn/Files/2021/08/24/1377468/cach-lam-pizza-pho-mai-bap-ngot-beo-ngay-don-gian-tai-nha-202108241432283228.jpg', 'Pizza phô mai', 30400, 38000, NULL, 4),
(16, 'https://cdn.tgdd.vn/2020/09/CookProduct/1200bzhspm-1200x676.jpg', 'Pizza hải sản', 32000, 40000, NULL, 4),
(17, 'https://cdn.tgdd.vn/Files/2020/08/19/1281398/cach-lam-khoai-tay-chien-trong-10-phut-voi-noi-chien-khong-dau-khoai-gion-de-lau-cung-khong-mem-202008191207088100.jpg', 'Khoai tây chiên', 12000, 15000, NULL, 5),
(18, 'https://daylambanh.edu.vn/wp-content/uploads/2020/02/khoai-tay-lac-pho-mai-600x400.jpg', 'Khoai tây lắc siêu cay', 14400, 18000, NULL, 5),
(19, 'https://heyyofoods.com/wp-content/uploads/2023/08/3-1.jpg', 'Khoai tây lóc xoáy', 16000, 20000, NULL, 5);

-- --------------------------------------------------------

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `idNguoiDung` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `hoTen` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `anh` varchar(255) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nguoidung`
--

INSERT INTO `nguoidung` (`idNguoiDung`, `email`, `matKhau`, `hoTen`, `sdt`, `anh`, `diaChi`, `role`) VALUES
(1, 'admin@example.com', '123', 'Admin', '0935457659', 'https://placekitten.com/g/480/480', '123 Đường Lê Lợi, Phường Hải Châu I, Quận Hải Châu, Đà Nẵng', 'admin'),
(2, 'user@example.com', '123', 'Nguyễn Văn A', '0305465865', 'https://placekitten.com/g/480/480', '456 Đường Nguyễn Văn Linh, Phường Thanh Khê Tây, Quận Thanh Khê, Đà Nẵng', 'user'),
(3, 'laptqpd06367@fpt.edu.vn', '123', 'Trương Quốc Lập', '0901234567', 'https://i.imgur.com/nMiEl37.png', '123 Đường Lê Lợi, Phường Hải Châu I, Quận Hải Châu, Đà Nẵng', 'user'),
(4, 'quocpcpd06159@fpt.edu.vn', '123', 'Phan Công Quốc', '0901234568', 'https://i.imgur.com/YnjNtiS.png', '456 Đường Nguyễn Văn Linh, Phường Thanh Khê Tây, Quận Thanh Khê, Đà Nẵng', 'user'),
(5, 'trongdvpd05839@fpt.edu.vn', '123', 'Đinh Văn Trọng', '0901234569', 'https://i.imgur.com/1yxCHde.png', '789 Đường Phan Chu Trinh, Phường Thanh Khê Đông, Quận Thanh Khê, Đà Nẵng', 'user'),
(6, 'tuannvpd06366@fpt.edu.vn', '123', 'Nguyễn Vũ Tuấn', '0901234570', 'https://i.imgur.com/DBKNVri.png', '234 Đường Hoàng Diệu, Phường Thạch Thang, Quận Hải Châu, Đà Nẵng', 'user'),
(7, 'doannvpd05545@fpt.edu.vn', '123', 'Nguyễn Văn Đoàn', '0901234571', 'https://i.imgur.com/7P53lc6.png', '567 Đường Nguyễn Tri Phương, Phường Thạch Thang, Quận Hải Châu, Đà Nẵng', 'user'),
(8, 'phapdvpd06383@fpt.edu.vn', '123', 'Đặng Văn Pháp', '0901234572', 'https://i.imgur.com/xB0XsZE.png', '890 Đường Lê Duẩn, Phường Thạch Thang, Quận Hải Châu, Đà Nẵng', 'user'),
(9, 'hoangntpd06863@fpt.edu.vn', '123', 'Nguyễn Thanh Hoàng', '0901234573', 'https://i.imgur.com/76hgCfF.png', '345 Đường Lê Hồng Phong, Phường Hải Châu II, Quận Hải Châu, Đà Nẵng', 'user'),
(10, 'trongdgpd06965@fpt.edu.vn', '123', 'Đoàn Gia Trọng', '0901234574', 'https://i.imgur.com/T39hnNm.png', '678 Đường Ông Ích Khiêm, Phường Hải Châu II, Quận Hải Châu, Đà Nẵng', 'user'),
(11, 'vuilttpd06659@fpt.edu.vn', '123', 'Lê Thị Thuỳ Vui', '0901234575', 'https://i.imgur.com/tZHSMx7.png', '901 Đường Trưng Trắc, Phường Thạch Thang, Quận Hải Châu, Đà Nẵng', 'user'),
(12, 'thanhptpd05482@fpt.edu.vn', '123', 'Phạm Tiến Thành', '0901234576', 'https://i.imgur.com/xB0XsZE.png', '123 Đường Nguyễn Tri Phương, Phường Hải Châu I, Quận Hải Châu, Đà Nẵng', 'user'),
(13, 'ngaltqpd06490@fpt.edu.vn', '123', 'Lê Thị Quỳnh Nga', '0901234577', 'https://i.imgur.com/rblRvFf.png', '456 Đường Trưng Trắc, Phường Thạch Thang, Quận Hải Châu, Đà Nẵng', 'user'),
(14, 'adv@gmail.com', '1', NULL, NULL, NULL, NULL, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `nhahang`
--

CREATE TABLE `nhahang` (
  `id` int(11) NOT NULL,
  `anh` longtext DEFAULT NULL,
  `ten` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `fanpage` varchar(255) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `nhahang`
--

INSERT INTO `nhahang` (`id`, `anh`, `ten`, `sdt`, `fanpage`, `diaChi`) VALUES
(0, 'https://www.garanfkt.vn/public/upload/baiviet/181y_mai%20anh.jpg', 'Gà Rán KFT', '0905888999', 'facebook.com/foodyplus', '123 Đường Nguyễn Văn Linh, Phường Thanh Khê Tây, Quận Thanh Khê, Đà Nẵng');

-- --------------------------------------------------------

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `idTheLoai` int(11) NOT NULL,
  `tenTheLoai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `theloai`
--

INSERT INTO `theloai` (`idTheLoai`, `tenTheLoai`) VALUES
(1, 'Bánh mì'),
(2, 'Burger'),
(3, 'Nước uống'),
(4, 'Pizza'),
(5, 'Khoai tây');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `danhgia`
--
ALTER TABLE `danhgia`
  ADD PRIMARY KEY (`idDanhGia`),
  ADD KEY `idNguoiDung` (`idNguoiDung`);

--
-- Indexes for table `giohang`
--
ALTER TABLE `giohang`
  ADD PRIMARY KEY (`idGioHang`),
  ADD KEY `idNguoiDung` (`idNguoiDung`);

--
-- Indexes for table `giohang_monan`
--
ALTER TABLE `giohang_monan`
  ADD PRIMARY KEY (`idGioHang`),
  ADD KEY `idMonAn` (`idMonAn`);

--
-- Indexes for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD PRIMARY KEY (`idHoaDon`),
  ADD KEY `idGioHang` (`idGioHang`),
  ADD KEY `idNguoiDung` (`idNguoiDung`);

--
-- Indexes for table `monan`
--
ALTER TABLE `monan`
  ADD PRIMARY KEY (`idMonAn`),
  ADD KEY `idTheLoai` (`idTheLoai`);

--
-- Indexes for table `nguoidung`
--
ALTER TABLE `nguoidung`
  ADD PRIMARY KEY (`idNguoiDung`);

--
-- Indexes for table `nhahang`
--
ALTER TABLE `nhahang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `theloai`
--
ALTER TABLE `theloai`
  ADD PRIMARY KEY (`idTheLoai`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `danhgia`
--
ALTER TABLE `danhgia`
  MODIFY `idDanhGia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `giohang`
--
ALTER TABLE `giohang`
  MODIFY `idGioHang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `hoadon`
--
ALTER TABLE `hoadon`
  MODIFY `idHoaDon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `monan`
--
ALTER TABLE `monan`
  MODIFY `idMonAn` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `nguoidung`
--
ALTER TABLE `nguoidung`
  MODIFY `idNguoiDung` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `theloai`
--
ALTER TABLE `theloai`
  MODIFY `idTheLoai` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `danhgia`
--
ALTER TABLE `danhgia`
  ADD CONSTRAINT `danhgia_ibfk_1` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`);

--
-- Constraints for table `giohang`
--
ALTER TABLE `giohang`
  ADD CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`);

--
-- Constraints for table `giohang_monan`
--
ALTER TABLE `giohang_monan`
  ADD CONSTRAINT `giohang_monan_ibfk_1` FOREIGN KEY (`idGioHang`) REFERENCES `giohang` (`idGioHang`),
  ADD CONSTRAINT `giohang_monan_ibfk_2` FOREIGN KEY (`idMonAn`) REFERENCES `monan` (`idMonAn`);

--
-- Constraints for table `hoadon`
--
ALTER TABLE `hoadon`
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`),
  ADD CONSTRAINT `hoadon_ibfk_3` FOREIGN KEY (`idGioHang`) REFERENCES `giohang` (`idGioHang`);

--
-- Constraints for table `monan`
--
ALTER TABLE `monan`
  ADD CONSTRAINT `monan_ibfk_1` FOREIGN KEY (`idTheLoai`) REFERENCES `theloai` (`idTheLoai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
