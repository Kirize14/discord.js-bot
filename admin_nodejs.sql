-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 13, 2018 at 01:15 PM
-- Server version: 5.7.24-0ubuntu0.16.04.1
-- PHP Version: 7.1.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `bot_info`
--

CREATE TABLE `bot_info` (
  `id` int(11) NOT NULL,
  `var` varchar(500) NOT NULL,
  `var_ans` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bot_info`
--

INSERT INTO `bot_info` (`id`, `var`, `var_ans`) VALUES
(1, 'status', 'สู้ๆ Fighto~');

-- --------------------------------------------------------

--
-- Table structure for table `code`
--

CREATE TABLE `code` (
  `id` int(11) NOT NULL,
  `code` varchar(30) NOT NULL,
  `used` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `code`
--

INSERT INTO `code` (`id`, `code`, `used`) VALUES
(1, 'Z9T8T-44IFI-K8QZ6', 1),
(2, 'BB6EC-53WWH-Q7E33 ', 1),
(3, 'FVFA7-BL3ZW-QCFM5', 1),
(4, 'B7NYV-JVMLG-W6WQM', 1),
(5, '8WG0G-T64ND-RFHW3', 1),
(6, '7V9TE-B4AQ4-CIX4G', 1),
(7, 'BKETA-T5HRR-LWMCF', 1),
(8, 'M6JN3-AN6WJ-AI0RM', 1),
(9, 'LJVNK-C3YJR-D7086', 1),
(10, 'acs', 1);

-- --------------------------------------------------------

--
-- Table structure for table `qanda`
--

CREATE TABLE `qanda` (
  `id` int(11) NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `qanda`
--

INSERT INTO `qanda` (`id`, `question`, `answer`) VALUES
(1, 'ใครเป็นคนสร้างบอทตัวนี้เอ่ย (ชื่อภาษาอังกฤษ)', 'Kirize14'),
(2, 'Kirize14 มีชื่อภาษาไทยว่าอะไร', 'คิไรซ์'),
(3, 'พี่ปิ๊งมีส่วนสูงเท่าไหร่เอ่ย (หน่วยเป็นเซนติเมตร)', '148'),
(4, 'หมายเลขบัญชีพี่ปิ๊ง ^0^ (กสิกร ไม่ต้องมีขีด)', '7782118026'),
(5, 'แมวพี่ปิ๊งมีชือว่าอะไร', 'มุ้ย'),
(6, 'ม้าน้ำเป็นสัตว์ชนิดใด', 'หนึ่ง'),
(7, 'พี่ปิ๊งเคยเรียกคิไรซ์ว่าอะไร (ปัจจุบันบางทีก็เรียกอยู่)', 'คิระ'),
(8, 'ในคลังเกมของพี่ปิ๊ง พี่ปิ๊งเล่นเกมอะไรมากที่สุด', 'Dota 2'),
(9, 'มุ้ยเป็นสัตว์ชนิดใด', 'แมว'),
(10, 'มุ้ยเป็นแมวพันธ์อะไร', 'Scottish Fold');

-- --------------------------------------------------------

--
-- Table structure for table `whatever`
--

CREATE TABLE `whatever` (
  `id` int(11) NOT NULL,
  `listening` varchar(500) NOT NULL,
  `reply` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `whatever`
--

INSERT INTO `whatever` (`id`, `listening`, `reply`) VALUES
(1, 'ง่วง', 'ไปนอนไป๊ ไปเลยไป๊ ชิ่วๆ'),
(2, 'บอทจ๋า', 'จ๋าๆๆ ว่าไงเอ่ย > w<'),
(3, 'กอดหน่อย', 'มามะ มากอดกันน้า งุ้ยย'),
(4, 'หิว', 'หาไรกินด้วยน้าา เดี๋ยวเป็นโรคน้ำกัดเท้านะ ระวังด้วย <3 '),
(5, 'กิน', 'เอาอะไรดี มีให้เลือกเยอะแยะเลย'),
(6, 'ป้อนหน่อย', 'มามะ มามะ อ้ามมมม อย่าลืมเคี้ยวด้วยหละ'),
(7, 'เก่งมาก', 'งุ้ย เขิง >///<'),
(8, '...', 'จุดเริ่มต้นความรักของเรา?'),
(10, '!!', 'คำสั่งไม่พบ ลองใช้ !!help เพื่อหาคำสั่งนะ :3  งุ้ย\''),
(11, 'สวัสดี', 'ดีจ้า'),
(15, 'ทดสอบระบบ', 'อะไร'),
(17, 'ทดสอบอีกครั้ง', 'เบื่อแย้ว'),
(18, 'ทดสอบอีกรอบ', 'ม่ายยยยยย'),
(20, 'หมั้ย', 'หมั้ย หมั้ย หมั้ย หมั้ย หมั้ย หมั้ย หมั้ย หมั้ย หมั้ย'),
(21, 'อ๋อย', 'อ๋อย อ๋อย'),
(22, 'อะไร', 'ก็จะอะไรหละ'),
(23, 'เลขบช', '788-211-8026 กสิกร ชื่อ นางสาว นนทิยา เฉลิมนัย'),
(24, 'บอทกาก', 'ตบกันมะ'),
(25, 'ไม่เก๋าจ้า นี่กระพง', 'แต่เราคราฟนะ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bot_info`
--
ALTER TABLE `bot_info`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `code`
--
ALTER TABLE `code`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `qanda`
--
ALTER TABLE `qanda`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `whatever`
--
ALTER TABLE `whatever`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bot_info`
--
ALTER TABLE `bot_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `code`
--
ALTER TABLE `code`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `qanda`
--
ALTER TABLE `qanda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `whatever`
--
ALTER TABLE `whatever`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
