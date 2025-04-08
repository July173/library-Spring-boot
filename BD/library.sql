-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-04-2025 a las 23:19:23
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
-- Base de datos: `library`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `book`
--

CREATE TABLE `book` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `isbn` bigint(20) NOT NULL,
  `state_book` bigint(20) NOT NULL,
  `author` varchar(225) NOT NULL,
  `description` varchar(225) NOT NULL,
  `publisher` varchar(225) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `book`
--

INSERT INTO `book` (`id`, `status`, `stock`, `isbn`, `state_book`, `author`, `description`, `publisher`, `title`, `url`) VALUES
(1, 0, 15, 1234567891023, 1, 'J.R.R. Tolkien', 'Una épica historia de fantasía.', 'Minotauro', 'El Señor de los Anillos', 'https://example.com/imagenes/libro.jpg'),
(2, 1, 15, 4587567891045, 1, 'Mario Mendoza', 'De una gran escirtor colombiano', 'Planeta', 'Leer es resistir', 'https://imgur.com/oNBLabd'),
(3, 1, 15, 4587567897854, 1, 'Mario Mendoza', 'De una gran escirtor colombiano', 'Planeta', 'Scorpio city', 'https://imgur.com/9b7T07o'),
(4, 1, 15, 2587567891458, 1, 'Mario Mendoza', 'De una gran escirtor colombiano', 'Planeta', 'La melaconlia de los feos', 'https://imgur.com/PasfvA2'),
(5, 1, 15, 2587567891453, 1, 'Mario Mendoza', 'De una gran escirtor colombiano', 'Planeta', 'Apocalipsis', 'https://imgur.com/EoS5SUe'),
(6, 1, 15, 1458469145365, 1, 'Connor Hamilton', 'Es una historia sobre Jessica y Charles, dos personas atrapadas en un torbellino de emociones ', 'Planeta', 'Hasta que el Verano se Acabe', 'https://imgur.com/tafzhTj'),
(7, 1, 15, 3458469145365, 1, 'Mario Mendoza', 'De una gran escritor colombiano ', 'Planeta', 'Satanas', 'https://imgur.com/ZspNqve'),
(8, 1, 15, 1258469145365, 1, 'Mario Mendoza', 'De una gran escritor colombiano ', 'Planeta', 'Los hombres invisibles', 'https://imgur.com/ZspNqve');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `employee`
--

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `status` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `position` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `employee`
--

INSERT INTO `employee` (`id`, `phone_number`, `status`, `name`, `position`) VALUES
(1, 3125364789, 1, 'Juan Pérez', 'Administrador'),
(2, 3235689741, 0, 'Camila Montes', 'Vendedora');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `loan`
--

CREATE TABLE `loan` (
  `date_loan` date NOT NULL,
  `date_return` date NOT NULL,
  `id` int(11) NOT NULL,
  `id_book` int(11) NOT NULL,
  `id_employee` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `state_loan` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `loan`
--

INSERT INTO `loan` (`date_loan`, `date_return`, `id`, `id_book`, `id_employee`, `status`, `state_loan`) VALUES
('2025-04-04', '2025-04-15', 1, 3, 1, 0, 'Active'),
('2025-03-04', '2025-04-15', 2, 2, 1, 1, 'Active'),
('2024-03-04', '2025-04-15', 3, 4, 1, 1, 'Active');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `status` int(11) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `email` varchar(120) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `phone_number`, `status`, `last_name`, `name`, `email`, `address`) VALUES
(1, 3123456789, 0, 'Pérez', 'Juan', 'juan.perez@example.com', 'Calle 123 #45-67, Bogotá'),
(2, 3123456789, 1, 'Pérez', 'Maria', 'juan.perez@example.com', 'Calle 123 #45-67, Bogotá');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_loan`
--

CREATE TABLE `user_loan` (
  `id` int(11) NOT NULL,
  `id_loan` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `observations` varchar(255) NOT NULL,
  `state_loan` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_loan`
--

INSERT INTO `user_loan` (`id`, `id_loan`, `id_user`, `status`, `observations`, `state_loan`) VALUES
(2, 1, 1, 0, 'Entrega realizada sin observaciones', 'Activo'),
(3, 2, 1, 1, 'Entrega realizada sin observaciones', 'Activo');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `loan`
--
ALTER TABLE `loan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK10ffxmthqlnpchvthtivt9jp2` (`id_book`),
  ADD KEY `FKs62n83ds2eqouht8y673frn66` (`id_employee`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user_loan`
--
ALTER TABLE `user_loan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnydml0nn1cm88d0y9xepkc5ee` (`id_loan`),
  ADD KEY `FKsanylrrnrm75f3sdoss1knhfm` (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `book`
--
ALTER TABLE `book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `loan`
--
ALTER TABLE `loan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `user_loan`
--
ALTER TABLE `user_loan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `loan`
--
ALTER TABLE `loan`
  ADD CONSTRAINT `FK10ffxmthqlnpchvthtivt9jp2` FOREIGN KEY (`id_book`) REFERENCES `book` (`id`),
  ADD CONSTRAINT `FKs62n83ds2eqouht8y673frn66` FOREIGN KEY (`id_employee`) REFERENCES `employee` (`id`);

--
-- Filtros para la tabla `user_loan`
--
ALTER TABLE `user_loan`
  ADD CONSTRAINT `FKnydml0nn1cm88d0y9xepkc5ee` FOREIGN KEY (`id_loan`) REFERENCES `loan` (`id`),
  ADD CONSTRAINT `FKsanylrrnrm75f3sdoss1knhfm` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
