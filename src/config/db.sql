-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 15, 2023 at 06:47 AM
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

-- --------------------------------------------------------
--
-- Cấu trúc bảng cho bảng `admin`
--

CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL,
  `tenAdmin` varchar(255) NOT NULL,
  `urlAnh` varchar(255) DEFAULT NULL,
  `diaChi` varchar(255) NOT NULL,
  `fanPage` varchar(255) DEFAULT NULL,
  `SDT` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Chỉ mục cho bảng `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idAdmin`);
COMMIT;

--
-- Table structure for table `nguoidung`
--

CREATE TABLE `nguoidung` (
  `idNguoiDung` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `matKhau` varchar(255) NOT NULL,
  `hoTen` varchar(255) DEFAULT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `anh` varchar(255) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL
) 

--
-- Table structure for table `theloai`
--

CREATE TABLE `theloai` (
  `idTheLoai` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `tenTheLoai` varchar(255) NOT NULL
)

--
-- Table structure for table `monan`
--

CREATE TABLE `monan` (
  `idMonAn` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `anh` longtext DEFAULT NULL,
  `ten` varchar(255) NOT NULL,
  `giaBan` int(11) NOT NULL,
  `giaGiam` int(11) DEFAULT NULL,
  `idTheLoai` int(11) NOT NULL,
  FOREIGN KEY (`idTheLoai`) REFERENCES `theloai` (`idTheLoai`)
)

--
-- Table structure for table `rating`
--

CREATE TABLE `rating` (
  `idRating` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `SoSao` int NOT NULL,
  `moTa` varchar(255) NOT NULL
) 


CREATE TABLE `giohang` (
  `idGioHang` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `soLuong` int(11) NOT NULL,
  `idMonAn` int(11) NOT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `trangThai` int(11) NOT NULL,
  FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`),
  FOREIGN KEY (`idMonAn`) REFERENCES `monan` (`idMonAn`);
)

-- --------------------------------------------------------

--
-- Table structure for table `hoadon`
--

CREATE TABLE `hoadon` (
  `idHoaDon` varchar(255) NOT NULL PRIMARY KEY,
  `ngayDat` date NOT NULL,
  `diaChi` varchar(255) DEFAULT NULL,
  `trangThai` int(11) NOT NULL,
  `tongTienHoaDon` int(11) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `idNguoiDung` int(11) NOT NULL,
  `idGioHang` int(11) NOT NULL,
  `phuongThucTT` varchar(255) NOT NULL,
  FOREIGN KEY (`idGioHang`) REFERENCES `giohang` (`idGioHang`),
  FOREIGN KEY (`idNguoiDung`) REFERENCES `nguoidung` (`idNguoiDung`)
) 
 /* thêm dữ liệu vào bảng người dùng*/
 insert into nguoiDung (email, matKhau, role) 
 values ('admin@example.com','123','admin'),
 ('user@example.com','123','user');

  /* thêm dữ liệu vào bảng thể loại*/
 insert into theloai (tenTheLoai)
 values ('Bánh mì'),('Cơm tấm'),('Món chính');

 /* thêm dữ liệu vào bảng món ăn*/
 insert into monan (ten, giaBan, idTheLoai)
 values ('Bánh mì thịt char', 15000, 1),
 ('Bánh mì cá sẵn', 18000, 1),
 ('Bánh mì bò', 17000, 1),
 ('Bánh mì trứng', 16000, 1),
 ('Bánh mì kem', 19000, 1),
 ('Bánh mì xôi', 14000, 1),
 ('Cơm tấm bó', 15000, 2),
 ('Cơm tấm cá', 16000, 2)
<<<<<<< Updated upstream

 CREATE TABLE `nhaHang` (
  `anh` longtext NOT NULL,
  `ten` varchar(255) NOT NULL,
  `sdt` varchar(255) DEFAULT NULL,
  `fanPage` varchar(255) DEFAULT NULL,
  `diaChi` varchar(255) DEFAULT NULL, 
) 
=======
>>>>>>> Stashed changes
