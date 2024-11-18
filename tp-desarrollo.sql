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


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tp-desarrollo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clothe`
--

CREATE TABLE `clothe` (
  `idCl` int(11) NOT NULL,
  `nameCl` varchar(70) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `size` varchar(3) NOT NULL,
  `typeCl` varchar(200) NOT NULL,
  `stock` int(11) NOT NULL,
  `image` varchar(500) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clothe`
--

INSERT INTO `clothe` (`idCl`, `nameCl`, `description`, `size`, `typeCl`, `stock`, `image`, `price`) VALUES
(1, 'Remera Basica', 'Remera de algodon color blanco', 'M', 'Remera', 50, 'remera-blanca.jpg', 2500),
(2, 'Jean Slim', 'Jean azul ajustado', '42', 'Jean', 30, 'jean-azul.jpg', 5000),
(3, 'Campera de Cuero', 'Campera de cuero negra', 'L', 'Campera', 20, 'campera-cuero.jpg', 12000),
(4, 'Zapatillas Deportivas', 'Zapatillas Nike Running', '42', 'Calzado', 40, 'zapatillas-nike.jpg', 8000),
(5, 'Camisa Formal', 'Camisa blanca de vestir', 'L', 'Camisa', 25, 'camisa-blanca.jpg', 4500),
(6, 'Pantalon Chino', 'Pantalon casual color beige', '44', 'Pantalon', 35, 'pantalon-chino.jpg', 6000),
(7, 'Buzo Deportivo', 'Buzo con capucha gris', 'M', 'Buzo', 45, 'buzo-gris.jpg', 7500),
(8, 'Shorts Deportivos', 'Shorts negros para gimnasio', 'M', 'Shorts', 60, 'shorts-negros.jpg', 3000),
(9, 'Campera Deportiva', 'Campera ligera para running', 'L', 'Campera', 30, 'campera-running.jpg', 9000),
(10, 'Vestido Casual', 'Vestido estampado de verano', 'U', 'Vestido', 20, 'vestido-verano.jpg', 6500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locality`
--

CREATE TABLE `locality` (
  `postalCode` int(11) NOT NULL,
  `nameLo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `locality`
--

INSERT INTO `locality` (`postalCode`, `nameLo`) VALUES
(1000, 'Buenos Aires'),
(2000, 'Rosario'),
(3000, 'Santa Fe'),
(4000, 'San Miguel de Tucuman'),
(4200, 'Santiago del Estero'),
(5000, 'Cordoba'),
(6000, 'Santa Rosa'),
(7000, 'Tandil'),
(8000, 'Bahia Blanca'),
(9000, 'Neuquen');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `province`
--

CREATE TABLE `province` (
  `idPr` int(11) NOT NULL,
  `namePr` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `province`
--

INSERT INTO `province` (`idPr`, `namePr`) VALUES
(12, 'buenos aires'),
(17, 'chaco'),
(13, 'cordoba'),
(14, 'entre rios'),
(15, 'mendoza'),
(19, 'neuquen'),
(18, 'rio negro'),
(20, 'san juan'),
(1, 'santa fe'),
(16, 'tucuman');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase`
--

CREATE TABLE `purchase` (
  `idPu` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `datePurchase` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `idSh` int(11) DEFAULT NULL,
  `idUs` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchase`
--

INSERT INTO `purchase` (`idPu`, `amount`, `datePurchase`, `idSh`, `idUs`) VALUES
(1, 2500, '2024-11-18 17:21:39.302046', 1, 2),
(2, 12000, '2024-11-18 17:21:39.302046', 2, 3),
(3, 5000, '2024-11-18 17:21:39.302046', 3, 4),
(4, 8000, '2024-11-18 17:21:39.302046', 4, 5),
(5, 4500, '2024-11-18 17:21:39.302046', 5, 6),
(6, 6000, '2024-11-18 17:21:39.302046', 6, 7),
(7, 7500, '2024-11-18 17:21:39.302046', 7, 8),
(8, 3000, '2024-11-18 17:21:39.302046', 8, 9),
(9, 9000, '2024-11-18 17:21:39.302046', 9, 10),
(10, 6500, '2024-11-18 17:21:39.302046', 10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `purchase_clothes`
--

CREATE TABLE `purchase_clothes` (
  `purchase` int(11) NOT NULL,
  `clothe` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `purchase_clothes`
--

INSERT INTO `purchase_clothes` (`purchase`, `clothe`) VALUES
(1, 1),
(2, 3),
(3, 2),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `shipment`
--

CREATE TABLE `shipment` (
  `idSh` int(11) NOT NULL,
  `dateShipmentOut` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` varchar(200) NOT NULL DEFAULT 'Procesando Datos Envio',
  `postalCode` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `shipment`
--

INSERT INTO `shipment` (`idSh`, `dateShipmentOut`, `status`, `postalCode`) VALUES
(1, '2024-11-18 17:21:26', 'Procesando Datos Envio', 2000),
(2, '2024-11-18 17:21:26', 'Procesando Datos Envio', 5000),
(3, '2024-11-18 17:21:26', 'Procesando Datos Envio', 1000),
(4, '2024-11-18 17:21:26', 'Procesando Datos Envio', 3000),
(5, '2024-11-18 17:21:26', 'Procesando Datos Envio', 4000),
(6, '2024-11-18 17:21:26', 'Procesando Datos Envio', 8000),
(7, '2024-11-18 17:21:26', 'Procesando Datos Envio', 7000),
(8, '2024-11-18 17:21:26', 'Procesando Datos Envio', 6000),
(9, '2024-11-18 17:21:26', 'Procesando Datos Envio', 9000),
(10, '2024-11-18 17:21:26', 'Procesando Datos Envio', 4200);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `idUs` int(11) NOT NULL,
  `nameUs` varchar(20) NOT NULL,
  `lastNameUs` varchar(20) NOT NULL,
  `emailUs` varchar(50) NOT NULL,
  `phoneUs` varchar(20) NOT NULL,
  `addressUs` varchar(50) NOT NULL,
  `passwordUs` varchar(200) NOT NULL,
  `rol` enum('user','admin','supplier') NOT NULL DEFAULT 'user',
  `postalCode` int(11) NOT NULL,
  `clothesIdCl` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`idUs`, `nameUs`, `lastNameUs`, `emailUs`, `phoneUs`, `addressUs`, `passwordUs`, `rol`, `postalCode`, `clothesIdCl`) VALUES
(1, 'Admin', 'Admin', 'admin@admin.com', '000000000', 'el rio 203', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 2000, NULL),
(2, 'Juan', 'Perez', 'juan.perez@example.com', '3414567890', 'San Martin 456', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 2000, NULL),
(3, 'Maria', 'Gomez', 'maria.gomez@example.com', '3415678901', 'Cordoba 789', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 5000, NULL),
(4, 'Carlos', 'Rodriguez', 'carlos.rodriguez@example.com', '3416789012', 'Entre Rios 234', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 3000, NULL),
(5, 'Laura', 'Martinez', 'laura.martinez@example.com', '3417890123', 'Maipu 567', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 1000, NULL),
(6, 'Pedro', 'Sanchez', 'pedro.sanchez@example.com', '3418901234', 'Belgrano 890', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 4000, NULL),
(7, 'Ana', 'Lopez', 'ana.lopez@example.com', '3419012345', 'San Juan 345', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 8000, NULL),
(8, 'Miguel', 'Fernandez', 'miguel.fernandez@example.com', '3420123456', 'Rivadavia 678', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 7000, NULL),
(9, 'Sofia', 'Garcia', 'sofia.garcia@example.com', '3421234567', 'Sarmiento 901', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 6000, NULL),
(10, 'Diego', 'Diaz', 'diego.diaz@example.com', '3422345678', 'Independencia 234', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 9000, NULL),
(11, 'Lucia', 'Torres', 'lucia.torres@example.com', '3423456789', 'Italia 567', '$2a$10$zOwxOaJ9jDogCIUDpESQOu2salkW0uE5ZY/gWlGWENZc6PWrgdELS', 'user', 4200, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `clothe`
--
ALTER TABLE `clothe`
  ADD PRIMARY KEY (`idCl`);

--
-- Indices de la tabla `locality`
--
ALTER TABLE `locality`
  ADD PRIMARY KEY (`postalCode`);

--
-- Indices de la tabla `province`
--
ALTER TABLE `province`
  ADD PRIMARY KEY (`idPr`),
  ADD UNIQUE KEY `IDX_01a52bdef7527ab5ec6ad8d703` (`namePr`);

--
-- Indices de la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD PRIMARY KEY (`idPu`),
  ADD KEY `FK_e41ca65156194f6f6c9716db656` (`idSh`),
  ADD KEY `FK_d46d15daa83314c021ee8fbda3a` (`idUs`);

--
-- Indices de la tabla `purchase_clothes`
--
ALTER TABLE `purchase_clothes`
  ADD PRIMARY KEY (`purchase`,`clothe`),
  ADD KEY `IDX_043b7f6c1ab6f70d42ccae5286` (`purchase`),
  ADD KEY `IDX_341310053c9eaf0dea1433a914` (`clothe`);

--
-- Indices de la tabla `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`idSh`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idUs`),
  ADD KEY `FK_4307326a5c847987787e67eaa4d` (`clothesIdCl`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `clothe`
--
ALTER TABLE `clothe`
  MODIFY `idCl` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `locality`
--
ALTER TABLE `locality`
  MODIFY `postalCode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9001;

--
-- AUTO_INCREMENT de la tabla `province`
--
ALTER TABLE `province`
  MODIFY `idPr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `purchase`
--
ALTER TABLE `purchase`
  MODIFY `idPu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `shipment`
--
ALTER TABLE `shipment`
  MODIFY `idSh` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `idUs` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `purchase`
--
ALTER TABLE `purchase`
  ADD CONSTRAINT `FK_d46d15daa83314c021ee8fbda3a` FOREIGN KEY (`idUs`) REFERENCES `user` (`idUs`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_e41ca65156194f6f6c9716db656` FOREIGN KEY (`idSh`) REFERENCES `shipment` (`idSh`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `purchase_clothes`
--
ALTER TABLE `purchase_clothes`
  ADD CONSTRAINT `FK_043b7f6c1ab6f70d42ccae52867` FOREIGN KEY (`purchase`) REFERENCES `purchase` (`idPu`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_341310053c9eaf0dea1433a914b` FOREIGN KEY (`clothe`) REFERENCES `clothe` (`idCl`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_4307326a5c847987787e67eaa4d` FOREIGN KEY (`clothesIdCl`) REFERENCES `clothe` (`idCl`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
