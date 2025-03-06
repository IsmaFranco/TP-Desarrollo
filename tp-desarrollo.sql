-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-11-2024 a las 18:54:24
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `tp-desarrollo`;

USE `tp-desarrollo`;



/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp-desarrollo`
--

-- --------------------------------------------------------

--
-- Volcado de datos para la tabla `clothe`
--

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

-- --------------------------------------------------------


-- Volcado de datos para la tabla `locality`
--

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

-- --------------------------------------------------------

-- Volcado de datos para la tabla `purchase`
--

INSERT INTO `purchase` (`idPu`, `amount`, `datePurchase`, `idSh`, `idUs`, `paymentId`) VALUES
(1, 2500, '2024-11-05 17:21:39.302046', 1, 2, '164852374519'),
(2, 12000, '2024-11-08 17:21:39.302046', 2, 3, '458752169547'),
(3, 5000, '2024-11-10 17:21:39.302046', 3, 4, '139587246854'),
(4, 8000, '2024-11-12 17:21:39.302046', 4, 5, '136254854968'),
(5, 4500, '2024-11-12 17:21:39.302046', 5, 6, '512489632654'),
(6, 6000, '2024-11-12 17:21:39.302046', 6, 7, '452197853468'),
(7, 7500, '2024-11-14 17:21:39.302046', 7, 8, '130480572340'),
(8, 3000, '2024-11-15 17:21:39.302046', 8, 9, '134850469823'),
(9, 9000, '2024-11-17 17:21:39.302046', 9, 10, '481596325485'),
(10, 6500, '2024-11-18 17:21:39.302046', 10, 2, '495632567840');

-- --------------------------------------------------------

-- Volcado de datos para la tabla `purchase_clothes`
--

INSERT INTO `purchase_clothes` (`id`, `quantity`, `unitPrice`, `purchase_id`, `clothe_id`) VALUES
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


-- --------------------------------------------------------

-- Volcado de datos para la tabla `shipment`
--

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

-- --------------------------------------------------------

-- Volcado de datos para la tabla `user`
--

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


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
