INSERT INTO `gamebox`.`usertype`
(`type`)
VALUES
('Admin'),('User');

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `avatar`, `password`, `type`) VALUES
(1, 'Jaime', 'Rivera', 'riverac85@gmail.com', '1619921227738.jpg', '$2a$10$L7aDASe7qqd6V/z/pwQyf.pBeVvqLY4HS/AETaRgIXa6YJ4pylD5O', 1);


INSERT INTO `categories` (`id`, `name`, `slug`, `parent_id`) VALUES
(1, 'Consolas', 'consolas', NULL),
(2, 'Juegos', 'juegos', NULL),
(3, 'Accesorios', 'accesorios', NULL),
(4, 'Computadores', 'computadores', NULL),
(5, 'Sillas Gamer', 'sillas-gamer', NULL),
(6, 'PS5', 'ps5', 1),
(7, 'PS4', 'ps4', 1),
(8, 'PS3', 'ps3', 1),
(9, 'PS Vita', 'ps-vita', 1),
(10, 'PSP', 'psp', 1),
(11, 'XBOX SERIES X', 'xbox-series-x', 1),
(12, 'XBOX SERIES S', 'xbox-series-s', 1),
(13, 'XBOX ONE', 'xbox-one', 1),
(14, 'NINTENDO SWITCH', 'nintendo-switch', 1),
(15, 'NINTENDO 3DS', 'nintendo-3ds', 1),
(16, 'RETRO', 'retro', 1),
(17, 'PS5', 'ps5', 2),
(18, 'PS4', 'ps4', 2),
(19, 'PS3', 'ps3', 2),
(20, 'PS Vita', 'ps-vita', 2),
(21, 'PSP', 'psp', 2),
(22, 'XBOX SERIES X', 'xbox-series-x', 2),
(23, 'XBOX SERIES S', 'xbox-series-s', 2),
(24, 'XBOX ONE', 'xbox-series-one', 2),
(25, 'NINTENDO SWITCH', 'nintendo-switch', 2),
(26, 'NINTENDO 3DS', 'nintendo-3ds', 2),
(27, 'RETRO', 'retro', 2),
(28, 'Audifonos', 'audifonos', 3),
(29, 'Teclados', 'teclados', 3),
(30, 'Monitores', 'monitores', 3),
(31, 'Alienware', 'alienware', 4),
(32, 'Asus', 'asus', 4),
(33, 'Lenovo', 'lenovo', 4),
(34, 'HP', 'hp', 4),
(35, 'Dell', 'dell', 4),
(36, 'Sillas 1', 'sillas-1', 5),
(37, 'Sillas 2', 'sillas-2', 5),
(38, 'Sillas 3', 'sillas-3', 5);





INSERT INTO `gamebox`.`shoppingcartstatus`
(
`status`)
VALUES
("CREATED"), ("PENDING"), ("PAYED"), ("REJECTED");



