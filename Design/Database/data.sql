INSERT INTO `gamebox`.`usertype`
(`type`)
VALUES
('Admin'),('User');

INSERT INTO `gamebox`.`users`
(
`firstName`,
`lastName`,
`email`,
`password`,
`type`)
VALUES
(
'Jaime',
'Rivera',
'riverac85@gmail.com',
'$2a$10$L7aDASe7qqd6V/z/pwQyf.pBeVvqLY4HS/AETaRgIXa6YJ4pylD5O',
1);


INSERT INTO `gamebox`.`categories`
(
`name`,
`slug`,
`parent_id`)
VALUES
(
'Consolas',
'consolas',
null), (
'Juegos',
'juegos',
null), (
'Accesorios',
'accesorios',
null), (
'Computadores',
'computadores',
null),(
'Sillas Gamer',
'sillas-gamer',
null)  ;

INSERT INTO `gamebox`.`categories`
(
`name`,
`slug`,
`parent_id`)
VALUES
(
'PS5',
'ps5',
1), (
'PS4',
'ps4',
1), (
'PS3',
'ps3',
1),
(
'PS Vita',
'ps-vita',
1) ,(
'PSP',
'psp',
1) ,
(
'XBOX SERIES X',
'xbox-series-x',
1) 
,(
'XBOX SERIES S',
'xbox-series-s',
1)   
,(
'XBOX ONE',
'xbox-one',
1)
,(
'NINTENDO SWITCH',
'nintendo-switch',
1) 
,(
'NINTENDO 3DS',
'nintendo-3ds',
1) ,
(
'RETRO',
'retro',
1) ;


INSERT INTO `gamebox`.`categories`
(
`name`,
`slug`,
`parent_id`)
VALUES
(
'PS5',
'ps5',
2), (
'PS4',
'ps4',
2), (
'PS3',
'ps3',
2),
(
'PS Vita',
'ps-vita',
2) ,(
'PSP',
'psp',
2) ,
(
'XBOX SERIES X',
'xbox-series-x',
2) 
,(
'XBOX SERIES S',
'xbox-series-s',
2)   
,(
'XBOX ONE',
'xbox-series-one',
2)
,(
'NINTENDO SWITCH',
'nintendo-switch',
2) 
,(
'NINTENDO 3DS',
'nintendo-3ds',
2) ,
(
'RETRO',
'retro',
2) ;


INSERT INTO `gamebox`.`categories`
(
`name`,
`slug`,
`parent_id`)
VALUES
(
'Audifonos',
'audifonos',
3), (
'Teclados',
'teclados',
3), (
'Monitores',
'monitores',
3);


INSERT INTO `gamebox`.`categories`
(
`name`,
`slug`,
`parent_id`)
VALUES
(
'Alienware',
'alienware',
4), (
'Asus',
'asus',
4)
,('Lenovo','lenovo',
4),
('HP','hp',
4), 
('Dell','dell',
4);


INSERT INTO `gamebox`.`categories`
(
`name`,
`slug`,
`parent_id`)
VALUES
(
'Sillas 1',
'sillas-1',
5), 
(
'Sillas 2',
'sillas-2',
5),
(
'Sillas 3',
'sillas-3',
5);

INSERT INTO `products` (`name`, `slug`, `description`, `price`, `image1`, `image2`, `category`, `hasEdition`, `edition`, `stock`, `isNew`, `rawInfo`) VALUES
( 'The last of us part II', 'the-last-of-us-part-ii', 'The Last of Us Part II es la secuela del juego de zombies postapocalíptico The Last of Us.', '205000', 'last-of-us-detail.png', 'tlou2.png', 18, 1, 'Standard;205000, Coleccionista;350000, Game of the year;250000', 10, 1, NULL),
( 'PS4 Pro', 'consola-ps4-pro', 'Ps4 Pro 1tb + Juego Fisico Spiderman. Nuevo y sellado. Garantia de 1 año. Control, Cable HDMI, 4K. Nueva y Sellada.', '2199000', 'ps4.jpg', 'ps4.jpg', 7, 1, 'Standard;2199000', 10, 1, NULL),
( 'Xbox Series X', 'xbox-series-x', 'Xbox Series X (Project Scarlett hasta el anuncio oficial de su nombre) es la consola de novena generación de Microsoft, la cuarta de la familia de hardware de entretenimiento de la compañía de Redmond. La nueva Xbox es una máquina que es cuatro veces más potente que la propia Xbox One X y ha sido diseñada por el mismo equipo de ingenieros que gestaron a Xbox One X, y también que han marcado un antes y un después para el multijugador con Xbox Live.', '3199000', 'xbox-controller.png', 'xbox-controller.png', 11, 0, NULL, 9, 1, NULL),
( 'Alienware M15', 'alienware-m15', 'Dell Alienware M15 I7 10ma 16b 512ssd Rtx2070 8gb', '9599000', 'alienware.jpg', 'alienware.jpg', 31, 0, NULL, 2, 1, NULL),
( 'Assassins Creed Valhalla', 'assassins-creed-valhalla', 'Conviértete en Eivor, un poderoso saqueador vikingo y lidera a tu clan desde las inclementes costas de Noruega a un nuevo hogar en medio de las exuberantes tierras de cultivo de la Inglaterra del siglo IX. Explora un hermoso y misterioso mundo abierto donde te enfrentarás a brutales enemigos, saquearás fortalezas, construirás el nuevo asentamiento de tu clan y forjarás alianzas para conseguir la gloria y obtener un lugar en el Valhalla.\r\n\r\nInglaterra, en la época de los vikingos, es una nación fracturada llena de amos mezquinos y reinos en guerra. Debajo de todo el caos yace una tierra salvaje y llena de abundancia que espera a un nuevo conquistador. ¿Serás tú?', '262000', 'ac-valhalla.png', 'ac-valhalla.png', 18, 1, 'Game of the year;270000, Standard;210000, Digital;140000', 2, 1, NULL),
( 'Monitor Curvo', 'monitor-curvo', 'Monitor curvo Samsung full HD 4K', '1200000', 'curved-monitor.png', 'curved-monitor.png', 38, 0, NULL, 10, 1, NULL),
( 'Cyber Punk 2077', 'cyber-punk-2077', 'Cyberpunk 2077 es un videojuego desarrollado y publicado por CD Projekt, que se lanzó para Microsoft Windows, PlayStation 4, y Xbox One el 10 de diciembre de 2020, y posteriormente en PlayStation 5, Xbox Series X|S y Google Stadia. Siendo una adaptación del juego de rol de mesa Cyberpunk 2020, se establece cincuenta y siete años más tarde en la ciudad distópica de Night City, California', '190000', 'cyberpunk-cover.png', 'cyber.jpg', 18, 0, '', 4, 1, NULL),
( 'Headphones stinger', 'headphones-stinger', 'Experimenta la libertad inalámbrica y el sonido surround 7.1 a un costo imbatible. Los HyperX Cloud Stinger Core son audífonos livianos para gaming con una gran calidad de sonido en un resistente paquete, altamente confiable. El micrófono con cancelación de ruido te permite chatear con amigos y asegura que tengas una nítida comunicación con tus compañeros. Sumérgete en el entretenimiento con el sonido surround virtual 7.1 a través del software NGENUITY de HyperX Cloud Stinger Core también cuenta con controles integrados para que puedas ajustar el volumen de los audífonos desde la orejera y un cómodo micrófono que al girar se pone en modo mudo.', '350000', 'hyperx_cloud_stinger_core_ps4.jpg', 'hyperx_cloud_stinger_core_ps4.jpg', 28, 0, '', 1, 1, NULL),
( 'Mario 3d World', 'mario-3d-world', 'El gato fuera de la bolsa Super Mario 3D World está llegando al sistema Nintendo Switch\r\nEl juego Super Mario 3D World + Bowser Fury cuenta con el mismo gran juego cooperativo\r\nniveles creativos y encendidos como el juego original, pero también mucho más. Más detalles sobre lo divertido que este juego tiene para ofrecer será revelado pronto\r\n¡Enciende, forma equipo, uno para salvar el Reino Sprixie!', '290000', 'mario 3dworld main.jpg', 'mario 3dworld second.jpg', 25, 0, '', 10, 1, NULL),
( 'play station 5', 'play-station-5', 'PS5 o PlayStation 5 es el nuevo hardware de entretenimiento o consola de Sony, y sale a la venta el 19 de noviembre en España y el 12 en otras regiones como Estados Unidos, Japón, Australia, México, Corea del Sur y Nueva Zelanda. Con un precio de 499 euros o 499 dólares en su versión estándar, es decir la que tiene soporte óptico, mientra que PlayStation 5 Digital Edition vale una cantidad más económica: 399 euros o 399 dólares.\r\n\r\nLa videoconsola tiene por mando el ya conocido DualSense, y es una máquina que tiene por objetivo de ofrecer un nuevo salto en lo gráfico en PS5 respecto a PS4 y situar como estándar la resolución 4K para la ejecución de videojuegos y, en muchas ocasiones, también los 60FPS. Aunque, eso sí, también hay soporte para resoluciones 8K entre otras funciones muy interesantes a nivel tecnológica.', '3500000', 'ps5-controller.png', 'ps5-dualshock.jpg', 6, 1, 'Digital;3000000,Lector Bluray;3500000', 2, 1, NULL),
( 'Silla gamer tronos', 'silla-gamer-tronos', 'Silla gamer comfortable y ergonómica', '1500000', 'silla_gamer_tronos.jpg', 'silla_gamer_tronos.jpg', 36, 0, NULL, 1, 1, NULL);

INSERT INTO `gamebox`.`shoppingcartstatus`
(
`status`)
VALUES
("CREATED"), ("PENDING"), ("PAYED"), ("REJECTED");

--
-- Volcado de datos para la tabla `shoppingcart`
--

INSERT INTO `shoppingcart` ( `user`, `itemsQuantity`, `totalPrice`, `date`, `shoppingCartStatus`) VALUES
( 1, 2, '2404000', '2021-04-18 20:06:07', 1);

--
-- Volcado de datos para la tabla `shoppingcartproducts`
--

INSERT INTO `shoppingcartproducts` ( `product`, `shoppingCart`, `hasEdition`, `edition`, `price`, `quantity`, `image`, `category`) VALUES
( 1, 1, 1, 'Standard;205000, Coleccionista;350000, Game of the year;250000', '205000', 1, 'tlou2.png',18),
( 2, 1, 1, 'Standard;2199000', '2199000', 1, 'ps4.jpg',7);


