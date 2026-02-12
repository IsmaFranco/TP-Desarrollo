CREATE DATABASE  IF NOT EXISTS `tp-desarrollo` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `tp-desarrollo`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: tp-desarrollo
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `clothe`
--

DROP TABLE IF EXISTS `clothe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clothe` (
  `idCl` int NOT NULL AUTO_INCREMENT,
  `nameCl` varchar(70) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `size` varchar(3) NOT NULL,
  `typeCl` varchar(200) NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(500) NOT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`idCl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clothe`
--

/*!40000 ALTER TABLE `clothe` DISABLE KEYS */;
INSERT INTO `clothe` (`idCl`, `nameCl`, `description`, `size`, `typeCl`, `stock`, `image`, `price`) VALUES
(1, 'Remera Basica', 'Remera de algodon color blanco', 'M', 'T-shirt', 5, 'https://http2.mlstatic.com/D_NQ_NP_941334-MLA45331817955_032021-O.webp', 1500),
(2, 'Jean Slim', 'Jean azul ajustado', 'L', 'Pants', 2, 'https://m.media-amazon.com/images/I/711uyEkzZUL.jpg', 1100),
(3, 'Remera Devil Angel', 'Remera oversize gris', 'L', 'T-shirt', 20, 'https://acdn.mitiendanube.com/stores/985/934/products/main65401-fb91790ae4a5094cb516952172985974-640-0.jpg', 1500),
(4, 'Zapatillas Deportivas', 'Zapatillas Nike Running', 'L', 'Shoes', 7, 'https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dwd6cdfdfe/products/NIFJ7765-001/NIFJ7765-001-6.JPG', 2200),
(5, 'Remera Zero', 'Remera Oversize azul', 'L', 'T-shirt', 25, 'https://con-actitud.com.ar/wp-content/uploads/2024/03/1-remera-negra-atras.jpg', 500),
(6, 'Pantalon Chino', 'Pantalon casual color beige', 'M', 'Pants', 35, 'https://acdn.mitiendanube.com/stores/004/034/002/products/16091-08-4-250e3d84c12ecb4ea617109435663253-1024-1024.jpg', 1000),
(7, 'Vans Knu', 'Zapatillas Vans negras', 'M', 'Shoes', 45, 'https://acdn.mitiendanube.com/stores/001/987/365/products/whatsapp-image-2024-07-26-at-15-40-05-a58f63afc34b93902b17220192592055-1024-1024.jpeg', 1700),
(8, 'Shorts Deportivos', 'Shorts negros para gimnasio', 'M', 'Pants', 60, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcK1vzTiv27vQOlGk03lrbmlj11pVRgaGWWw&s', 1900),
(9, 'Adidas Campus 2000', 'Zapatillas Adidas beige', 'L', 'Shoes', 30, 'https://acdn.mitiendanube.com/stores/001/240/717/products/eph_3358-51296c3f09a04d2c9d17000533997853-1024-1024.jpg', 1600),
(10, 'Jean Mom', 'Jean mom celeste hombre', 'XL', 'Pants', 20, 'https://vcp.com.ar/cdn/shop/files/SHELBYCELESTE1.jpg?v=1713470797', 800);
/*!40000 ALTER TABLE `clothe` ENABLE KEYS */;

--
-- Table structure for table `locality`
--

DROP TABLE IF EXISTS `locality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locality` (
  `idLo` int NOT NULL AUTO_INCREMENT,
  `postalCode` int NOT NULL,
  `nameLo` varchar(100) NOT NULL,
  `cost` double NOT NULL,
  PRIMARY KEY (`idLo`),
  UNIQUE KEY `IDX_15b1bca38b20301f2ea351c4d3` (`postalCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locality`
--

/*!40000 ALTER TABLE `locality` DISABLE KEYS */;
INSERT INTO `locality` (`postalCode`, `nameLo`, `cost`) VALUES
(1000, 'Buenos Aires', 500),
(2000, 'Rosario', 150),
(3000, 'Santa Fe', 250),
(4000, 'San Miguel de Tucuman', 600),
(4200, 'Santiago del Estero', 300),
(5000, 'Cordoba', 350),
(6000, 'Santa Rosa', 400),
(7000, 'Tandil', 450),
(8000, 'Bahia Blanca', 600),
(9000, 'Neuquen', 500);
/*!40000 ALTER TABLE `locality` ENABLE KEYS */;

--
-- Table structure for table `purchase`
--

DROP TABLE IF EXISTS `purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase` (
  `idPu` int NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `datePurchase` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `paymentId` varchar(255) DEFAULT NULL,
  `idSh` int DEFAULT NULL,
  `idUs` int DEFAULT NULL,
  PRIMARY KEY (`idPu`),
  KEY `FK_e41ca65156194f6f6c9716db656` (`idSh`),
  KEY `FK_d46d15daa83314c021ee8fbda3a` (`idUs`),
  CONSTRAINT `FK_d46d15daa83314c021ee8fbda3a` FOREIGN KEY (`idUs`) REFERENCES `user` (`idUs`),
  CONSTRAINT `FK_e41ca65156194f6f6c9716db656` FOREIGN KEY (`idSh`) REFERENCES `shipment` (`idSh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase`
--

/*!40000 ALTER TABLE `purchase` DISABLE KEYS */;
INSERT INTO `purchase` (`idPu`, `amount`, `datePurchase`, `idSh`, `idUs`, `paymentId`) VALUES
(1, 2500, '2024-11-05 17:21:39.302046', 1, 2, '164852374519'),
(2, 12000, '2024-11-10 17:21:39.302046', 2, 3, '458752169547'),
(3, 5000, '2024-11-24 17:21:39.302046', 3, 4, '139587246854'),
(4, 8000, '2024-12-01 17:21:39.302046', 4, 5, '136254854968'),
(5, 4500, '2024-12-17 17:21:39.302046', 5, 6, '512489632654'),
(6, 6000, '2024-12-29 17:21:39.302046', 6, 7, '452197853468'),
(7, 7500, '2025-01-03 17:21:39.302046', 7, 8, '130480572340'),
(8, 3000, '2025-01-19 17:21:39.302046', 8, 9, '134850469823'),
(9, 9000, '2025-02-12 17:21:39.302046', 9, 10, '481596325485'),
(10, 6500, '2025-02-24 17:21:39.302046', 10, 2, '495632567840');
/*!40000 ALTER TABLE `purchase` ENABLE KEYS */;

--
-- Table structure for table `purchase_clothe`
--

DROP TABLE IF EXISTS `purchase_clothe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_clothe` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `unitPrice` decimal(10,2) NOT NULL,
  `purchase_id` int DEFAULT NULL,
  `clothe_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bdb0864cf010fa9299120dbaffc` (`purchase_id`),
  KEY `FK_0bc4427fb145bef3f7fe5fc4bd9` (`clothe_id`),
  CONSTRAINT `FK_0bc4427fb145bef3f7fe5fc4bd9` FOREIGN KEY (`clothe_id`) REFERENCES `clothe` (`idCl`),
  CONSTRAINT `FK_bdb0864cf010fa9299120dbaffc` FOREIGN KEY (`purchase_id`) REFERENCES `purchase` (`idPu`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_clothe`
--

/*!40000 ALTER TABLE `purchase_clothe` DISABLE KEYS */;
INSERT INTO `purchase_clothe` (`id`, `quantity`, `unitPrice`, `purchase_id`, `clothe_id`) VALUES
(1, 1, 1500, 1, 1),
(2, 3, 1100, 2, 2),
(3, 2, 1500, 3, 3),
(4, 1, 2200, 4, 4),
(5, 2, 500, 4, 5),
(6, 4, 800, 4, 10),
(7, 3, 1000, 5, 6),
(8, 2, 1700, 6, 7),
(9, 1, 1900, 7, 8),
(10, 2, 1600, 8, 9),
(11, 3, 1000, 8, 6),
(12, 2, 1100, 9, 2),
(13, 3, 1500, 9, 1),
(14, 1, 1900, 10, 8),
(15, 2, 1500, 10, 3);
/*!40000 ALTER TABLE `purchase_clothe` ENABLE KEYS */;

--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shipment` (
  `idSh` int NOT NULL AUTO_INCREMENT,
  `dateShipmentOut` timestamp NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pendiente',
  `idLo` int DEFAULT NULL,
  PRIMARY KEY (`idSh`),
  KEY `FK_c0e91a85f26e2fc1b21c37818fd` (`idLo`),
  CONSTRAINT `FK_c0e91a85f26e2fc1b21c37818fd` FOREIGN KEY (`idLo`) REFERENCES `locality` (`idLo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shipment`
--

/*!40000 ALTER TABLE `shipment` DISABLE KEYS */;
INSERT INTO `shipment` (`idSh`, `dateShipmentOut`, `status`, `idLo`) VALUES
(1, '2024-11-18 17:21:26', 'Entregado', 2),
(2, '2024-11-18 17:21:26', 'Entregado', 6),
(3, '2024-11-18 17:21:26', 'Entregado', 1),
(4, '2024-11-18 17:21:26', 'Entregado', 3),
(5, '2024-11-18 17:21:26', 'Entregado', 4),
(6, '2024-11-18 17:21:26', 'Entregado', 9),
(7, '2024-11-18 17:21:26', 'Entregado', 8),
(8, '2024-11-18 17:21:26', 'Entregado', 7),
(9, '2024-11-18 17:21:26', 'Entregado', 10),
(10, '2024-11-18 17:21:26', 'Entregado', 5);
/*!40000 ALTER TABLE `shipment` ENABLE KEYS */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUs` int NOT NULL AUTO_INCREMENT,
  `nameUs` varchar(20) NOT NULL,
  `lastNameUs` varchar(20) NOT NULL,
  `emailUs` varchar(50) NOT NULL,
  `phoneUs` varchar(20) NOT NULL,
  `addressUs` varchar(50) NOT NULL,
  `passwordUs` varchar(200) NOT NULL,
  `rol` enum('user','admin','supplier') NOT NULL DEFAULT 'user',
  `idLo` int DEFAULT NULL,
  PRIMARY KEY (`idUs`),
  KEY `FK_61774953eca12fd0e7f54eb7bf7` (`idLo`),
  CONSTRAINT `FK_61774953eca12fd0e7f54eb7bf7` FOREIGN KEY (`idLo`) REFERENCES `locality` (`idLo`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`idUs`, `nameUs`, `lastNameUs`, `emailUs`, `phoneUs`, `addressUs`, `passwordUs`, `rol`, `idLo`) VALUES
(1, 'Admin', 'Admin', 'admin@admin.com', '000000000', 'el rio 203', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'admin', 1),
(2, 'Juan', 'Perez', 'juan.perez@example.com', '3414567890', 'San Martin 456', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 2),
(3, 'Maria', 'Gomez', 'maria.gomez@example.com', '3415678901', 'Cordoba 789', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 3),
(4, 'Carlos', 'Rodriguez', 'carlos.rodriguez@example.com', '3416789012', 'Entre Rios 234', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 4),
(5, 'Laura', 'Martinez', 'laura.martinez@example.com', '3417890123', 'Maipu 567', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 5),
(6, 'Pedro', 'Sanchez', 'pedro.sanchez@example.com', '3418901234', 'Belgrano 890', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 6),
(7, 'Ana', 'Lopez', 'ana.lopez@example.com', '3419012345', 'San Juan 345', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 7),
(8, 'Miguel', 'Fernandez', 'miguel.fernandez@example.com', '3420123456', 'Rivadavia 678', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 8),
(9, 'Sofia', 'Garcia', 'sofia.garcia@example.com', '3421234567', 'Sarmiento 901', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 9),
(10, 'Diego', 'Diaz', 'diego.diaz@example.com', '3422345678', 'Independencia 234', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 10),
(11, 'Lucia', 'Torres', 'lucia.torres@example.com', '3423456789', 'Italia 567', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 3);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;




/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-06 19:49:09
