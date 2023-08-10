-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 10, 2023 at 12:54 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventorydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'T-Shirt'),
(2, 'Polo Shirt'),
(3, 'Shirt'),
(4, 'Pant');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `color` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color`) VALUES
(1, 'Red'),
(2, 'Blue'),
(3, 'Red'),
(4, 'Black'),
(5, 'Red'),
(6, 'Black'),
(7, 'Red'),
(8, 'Black'),
(9, 'Red'),
(10, 'Black'),
(11, 'Red'),
(12, 'Black'),
(13, 'Red'),
(14, 'Black'),
(15, 'Red'),
(16, 'Black'),
(17, 'Red'),
(18, 'White'),
(19, 'Red'),
(20, 'Blue'),
(21, 'Red'),
(22, 'Blue'),
(23, 'Red'),
(24, 'Blue'),
(25, 'Red'),
(26, 'Blue'),
(27, 'Red'),
(28, 'Blue'),
(29, 'Red'),
(30, 'Blue'),
(31, 'Red'),
(32, 'Blue'),
(33, 'Red'),
(34, 'Blue'),
(35, 'Red'),
(36, 'Blue'),
(37, 'Red'),
(38, 'Blue'),
(39, 'Red'),
(40, 'Blue'),
(41, 'Red'),
(42, 'Blue');

-- --------------------------------------------------------

--
-- Table structure for table `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `links`
--

INSERT INTO `links` (`id`, `product_id`, `link`) VALUES
(1, 11, NULL),
(2, 11, NULL),
(3, 1, 'https://example.com/link1'),
(4, 1, 'https://example.com/link2'),
(5, 2, 'https://example.com/product2-link1'),
(6, 12, NULL),
(7, 12, NULL),
(8, 13, NULL),
(9, 13, NULL),
(12, 15, NULL),
(13, 15, NULL),
(14, 16, 'https://ibb.co/1mWPc7F'),
(15, 16, 'https://cdn.shopify.com/s/files/1/0516/1454/8144/products/f8a39c21-a85c-4c0a-95e3-66f3b048c8fa_1200x1200.jpg?v=1667933384'),
(16, 17, 'https://ibb.co/1mWPc7F'),
(17, 17, 'https://ibb.co/0Qw56F7');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `productName` varchar(255) NOT NULL,
  `productCode` varchar(50) NOT NULL,
  `productCategory` varchar(255) DEFAULT NULL,
  `buyingPrice` decimal(10,2) DEFAULT NULL,
  `buyingDate` date DEFAULT NULL,
  `sellingPrice` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `supplier_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `productName`, `productCode`, `productCategory`, `buyingPrice`, `buyingDate`, `sellingPrice`, `created_at`, `updated_at`, `supplier_id`) VALUES
(1, 'Product 1', 'P01', '1', '499.00', '2023-08-02', '799.00', '2023-08-08 09:59:15', '2023-08-08 09:59:15', 1),
(2, 'Product 2', 'P02', '3', '499.00', '2023-08-03', '899.00', '2023-08-08 15:08:57', '2023-08-08 15:08:57', 1),
(3, 'Product 2', 'P02', '3', '499.00', '2023-08-03', '899.00', '2023-08-08 15:23:21', '2023-08-08 15:23:21', 1),
(4, 'Product 2', 'P02', '3', '499.00', '2023-08-03', '899.00', '2023-08-08 15:25:43', '2023-08-08 15:25:43', 1),
(5, 'Product 2', 'P02', '3', '499.00', '2023-08-03', '899.00', '2023-08-08 15:37:15', '2023-08-08 15:37:15', 1),
(6, 'Product 2', 'P02', '3', '499.00', '2023-08-03', '899.00', '2023-08-08 16:27:02', '2023-08-08 16:27:02', 1),
(7, 'Product 2', 'P02', '3', '499.00', '2023-08-03', '899.00', '2023-08-08 16:28:52', '2023-08-08 16:28:52', 1),
(8, 'Product 2', 'P02', '3', '499.00', '2023-08-03', '899.00', '2023-08-08 16:31:48', '2023-08-08 16:31:48', 1),
(9, 'Product 3', 'P03', '2', '599.00', '2023-08-02', '999.00', '2023-08-08 17:15:03', '2023-08-08 17:15:03', 1),
(10, 'Product 4', 'P04', '2', '599.00', '2023-08-04', '799.00', '2023-08-08 17:50:42', '2023-08-08 17:50:42', 1),
(11, 'Product 4', 'P04', '2', '599.00', '2023-08-04', '799.00', '2023-08-08 17:51:58', '2023-08-08 17:51:58', 1),
(12, 'Product 4', 'P04', '2', '599.00', '2023-08-04', '799.00', '2023-08-08 17:59:56', '2023-08-08 17:59:56', 1),
(13, 'Product 4', 'P04', '2', '599.00', '2023-08-04', '799.00', '2023-08-08 18:00:39', '2023-08-08 18:00:39', 1),
(14, 'Product 5', 'P05', '2', '599.00', '2023-08-01', '799.00', '2023-08-08 18:00:51', '2023-08-10 06:19:05', 2),
(15, 'Product 4', 'P04', '2', '599.00', '2023-08-04', '799.00', '2023-08-08 18:03:31', '2023-08-08 18:03:31', 1),
(16, 'Product 4', 'P04', '2', '599.00', '2023-08-04', '799.00', '2023-08-08 18:03:42', '2023-08-08 18:03:42', 1),
(17, 'Product 4', 'P04', '2', '599.00', '2023-08-04', '799.00', '2023-08-08 18:04:11', '2023-08-08 18:04:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_to_variation_mapping`
--

CREATE TABLE `product_to_variation_mapping` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `variation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `product_variations`
--

CREATE TABLE `product_variations` (
  `id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `color_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `quantity_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product_variations`
--

INSERT INTO `product_variations` (`id`, `product_id`, `color_id`, `size_id`, `quantity_id`) VALUES
(1, 1, 1, 1, NULL),
(2, 1, 1, 2, NULL),
(3, 1, 2, 3, NULL),
(4, 1, 2, 4, NULL),
(5, 1, 2, 5, NULL),
(6, 2, 3, 6, NULL),
(7, 2, 3, 7, NULL),
(8, 2, 4, 8, NULL),
(9, 2, 4, 9, NULL),
(10, 2, 4, 10, NULL),
(11, 3, 5, NULL, NULL),
(12, 5, 9, 17, NULL),
(13, 5, 9, 18, NULL),
(14, 5, 10, 19, NULL),
(15, 5, 10, 20, NULL),
(16, 5, 10, 21, NULL),
(17, 8, 15, 26, 16),
(18, 8, 15, 27, 17),
(19, 8, 16, 28, 18),
(20, 8, 16, 29, 19),
(21, 8, 16, 30, 20),
(22, 9, 17, 31, 21),
(23, 9, 17, 32, 22),
(24, 9, 18, 33, 23),
(25, 9, 18, 34, 24),
(26, 9, 18, 35, 25),
(27, 10, 19, 36, 26),
(28, 10, 19, 37, 27),
(29, 10, 20, 38, 28),
(30, 10, 20, 39, 29),
(31, 11, 21, 40, 30),
(32, 11, 21, 41, 31),
(33, 11, 22, 42, 32),
(34, 11, 22, 43, 33),
(35, 12, 23, 44, 34),
(36, 12, 23, 45, 35),
(37, 12, 24, 46, 36),
(38, 12, 24, 47, 37),
(39, 13, 25, 48, 38),
(40, 13, 25, 49, 39),
(41, 13, 26, 50, 40),
(42, 13, 26, 51, 41),
(47, 15, 29, 56, 46),
(48, 15, 29, 57, 47),
(49, 15, 30, 58, 48),
(50, 15, 30, 59, 49),
(51, 16, 31, 60, 50),
(52, 16, 31, 61, 51),
(53, 16, 32, 62, 52),
(54, 16, 32, 63, 53),
(55, 17, 33, 64, 54),
(56, 17, 33, 65, 55),
(57, 17, 34, 66, 56),
(58, 17, 34, 67, 57),
(75, 14, 41, 84, 74),
(76, 14, 42, 85, 75);

-- --------------------------------------------------------

--
-- Table structure for table `quantities`
--

CREATE TABLE `quantities` (
  `id` int(11) NOT NULL,
  `sizeId` int(255) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `quantities`
--

INSERT INTO `quantities` (`id`, `sizeId`, `quantity`) VALUES
(1, 1, 10),
(2, 2, 10),
(3, 3, 10),
(4, 4, 15),
(5, 5, 40),
(6, 6, 12),
(7, 7, 10),
(8, 8, 16),
(9, 9, 10),
(10, 10, 8),
(11, 17, 12),
(12, 18, 10),
(13, 19, 16),
(14, 20, 10),
(15, 21, 8),
(16, 26, 12),
(17, 27, 10),
(18, 28, 16),
(19, 29, 10),
(20, 30, 8),
(21, 31, 50),
(22, 32, 90),
(23, 33, 50),
(24, 34, 60),
(25, 35, 70),
(26, 36, 12),
(27, 37, 16),
(28, 38, 19),
(29, 39, 16),
(30, 40, 12),
(31, 41, 16),
(32, 42, 19),
(33, 43, 16),
(34, 44, 12),
(35, 45, 16),
(36, 46, 19),
(37, 47, 16),
(38, 48, 12),
(39, 49, 16),
(40, 50, 19),
(41, 51, 16),
(42, 52, 12),
(43, 53, 16),
(44, 54, 19),
(45, 55, 16),
(46, 56, 12),
(47, 57, 16),
(48, 58, 19),
(49, 59, 16),
(50, 60, 12),
(51, 61, 16),
(52, 62, 19),
(53, 63, 16),
(54, 64, 12),
(55, 65, 16),
(56, 66, 19),
(57, 67, 16),
(58, 68, 12),
(59, 69, 16),
(60, 70, 16),
(61, 71, 19),
(62, 72, 16),
(63, 73, 16),
(64, 74, 12),
(65, 75, 16),
(66, 76, 16),
(67, 77, 19),
(68, 78, 16),
(69, 79, 16),
(70, 80, 16),
(71, 81, 16),
(72, 82, 16),
(73, 83, 16),
(74, 84, 16),
(75, 85, 16);

-- --------------------------------------------------------

--
-- Table structure for table `sizes`
--

CREATE TABLE `sizes` (
  `id` int(11) NOT NULL,
  `size` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sizes`
--

INSERT INTO `sizes` (`id`, `size`) VALUES
(1, 'M'),
(2, 'L'),
(3, 'M'),
(4, 'L'),
(5, 'XL'),
(6, 'M'),
(7, 'L'),
(8, 'M'),
(9, 'L'),
(10, 'XL'),
(11, 'M'),
(12, 'M'),
(13, 'L'),
(14, 'M'),
(15, 'L'),
(16, 'XL'),
(17, 'M'),
(18, 'L'),
(19, 'M'),
(20, 'L'),
(21, 'XL'),
(22, 'M'),
(23, 'L'),
(24, 'M'),
(25, 'L'),
(26, 'M'),
(27, 'L'),
(28, 'M'),
(29, 'L'),
(30, 'XL'),
(31, 'M'),
(32, 'L'),
(33, 'M'),
(34, 'L'),
(35, 'XL'),
(36, 'M'),
(37, 'L'),
(38, 'M'),
(39, 'L'),
(40, 'M'),
(41, 'L'),
(42, 'M'),
(43, 'L'),
(44, 'M'),
(45, 'L'),
(46, 'M'),
(47, 'L'),
(48, 'M'),
(49, 'L'),
(50, 'M'),
(51, 'L'),
(52, 'M'),
(53, 'L'),
(54, 'M'),
(55, 'L'),
(56, 'M'),
(57, 'L'),
(58, 'M'),
(59, 'L'),
(60, 'M'),
(61, 'L'),
(62, 'M'),
(63, 'L'),
(64, 'M'),
(65, 'L'),
(66, 'M'),
(67, 'L'),
(68, 'M'),
(69, 'L'),
(70, 'L'),
(71, 'M'),
(72, 'L'),
(73, 'L'),
(74, 'M'),
(75, 'L'),
(76, 'L'),
(77, 'M'),
(78, 'L'),
(79, 'L'),
(80, 'L'),
(81, 'L'),
(82, 'L'),
(83, 'L'),
(84, 'L'),
(85, 'L');

-- --------------------------------------------------------

--
-- Table structure for table `suppliers`
--

CREATE TABLE `suppliers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` text,
  `remark` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suppliers`
--

INSERT INTO `suppliers` (`id`, `name`, `phone`, `address`, `remark`, `created_at`, `updated_at`) VALUES
(1, 'Supplier 1', '017XXXXXXXX', 'Bangladesh', 'Nice', '2023-08-08 06:38:15', '2023-08-08 06:38:15'),
(2, 'Supplier 2', '01XXXXXXXXX', 'Address 2', 'No Remark', '2023-08-10 06:18:49', '2023-08-10 06:18:49');

-- --------------------------------------------------------

--
-- Table structure for table `supplier_categories`
--

CREATE TABLE `supplier_categories` (
  `id` int(11) NOT NULL,
  `supplier_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `supplier_categories`
--

INSERT INTO `supplier_categories` (`id`, `supplier_id`, `category_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 2, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`);

--
-- Indexes for table `product_to_variation_mapping`
--
ALTER TABLE `product_to_variation_mapping`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `variation_id` (`variation_id`);

--
-- Indexes for table `product_variations`
--
ALTER TABLE `product_variations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `color_id` (`color_id`),
  ADD KEY `size_id` (`size_id`),
  ADD KEY `quantity_id` (`quantity_id`);

--
-- Indexes for table `quantities`
--
ALTER TABLE `quantities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `supplier_categories`
--
ALTER TABLE `supplier_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `supplier_id` (`supplier_id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_to_variation_mapping`
--
ALTER TABLE `product_to_variation_mapping`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `product_variations`
--
ALTER TABLE `product_variations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `quantities`
--
ALTER TABLE `quantities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `supplier_categories`
--
ALTER TABLE `supplier_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `links`
--
ALTER TABLE `links`
  ADD CONSTRAINT `links_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_to_variation_mapping`
--
ALTER TABLE `product_to_variation_mapping`
  ADD CONSTRAINT `product_to_variation_mapping_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_to_variation_mapping_ibfk_2` FOREIGN KEY (`variation_id`) REFERENCES `product_variations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `product_variations`
--
ALTER TABLE `product_variations`
  ADD CONSTRAINT `product_variations_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variations_ibfk_2` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variations_ibfk_3` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variations_ibfk_4` FOREIGN KEY (`quantity_id`) REFERENCES `quantities` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `supplier_categories`
--
ALTER TABLE `supplier_categories`
  ADD CONSTRAINT `supplier_categories_ibfk_1` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `supplier_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
