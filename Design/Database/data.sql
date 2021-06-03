INSERT INTO `gamebox`.`usertype`
(`type`)
VALUES
('Admin'),('User');

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `avatar`, `password`, `type`) VALUES
(1, 'Jaime', 'Rivera', 'riverac85@gmail.com', '1619921227738.jpg', '$2a$10$L7aDASe7qqd6V/z/pwQyf.pBeVvqLY4HS/AETaRgIXa6YJ4pylD5O', 1),
(2, 'jaime', 'Rivera', 'riverac89@gmail.com', '1619921227738.jpg', '$2a$10$dHMkS.j25wmWViUUV8Cb5.0STEiJpv3BXpGvJUutTpRpXLA8ACF.e', 1),
(3, 'jaime', 'Contreras', 'riverac33@gmail.com', '1619921258961.png', '$2a$10$wWN7jwNcOMQ1nS5OKLb.IeaYXGplqU2hw.TuNQCM5u297EYcAjzV2', 1),
(4, 'Erika', 'Martinez', 'riverac52@gmail.com', '1619921283153.jpg', '$2a$10$2sLoer6ejm2tQ2CcP/GoPOLo/nolmhz15uBDjel6iSTNfm3ylf8/2', 1),
(5, 'jaime ', 'Rivera ', 'riverac66@gmail.com', '1621297189130.jpg', '$2a$10$SHMxRXhS8JdtcGZvXRnHAupkCjf5pj0.0.o/80NVadgXWzzkdDn.u', 1),
(6, 'jaime   ', 'Rivera   ', 'riverac82@gmail.com', '1621297949946.jpg', '$2a$10$EDJ2DNQg/LYMKgyjhoOn..el642NLJxVcsKq5eyQeLWfNed3hv0Nu', 1),
(7, 'jaime', 'Rivera', 'riverac23@gmail.com', '1621298188545.jpg', '$2a$10$TFR.FuOAgqRqT2jc28IDw.dv8HEDPv6QYmOa0tEKSy8gT4qCFWB5G', 1),
(8, 'jaime', 'Rivera', 'rivesadasrac23@gmail.com', '1621987610176.jpg', '$2a$10$pNpOjyuUWrqvHeKOOGxcqOgMlnHL93Td8K.FlLc889xDwaf.D2cEO', 1),
(9, 'Erika', 'Martinez', 'rivefgdgfdc85@gmail.com', '1621987640992.jpg', '$2a$10$scmjOGBUwkDwp.9DsSiu8eXrSd6r1qdb1.2hITetnfwaC3dVvAlSq', 1),
(10, 'jaime', 'Rivera', 'hjgjgh@pepe.com', '1621987663996.jpg', '$2a$10$d0ENmHB7v67MvuLCk1RTmOchzfQb76uxgyVI6I.eEYnQjmZH/sWWy', 1),
(11, 'alguien', 'alguien', 'dsdsaa5@gmail.com', '1621995153695.jpg', '$2a$10$D9J1dqr9SO.0psa3bEeIhONENOMtL1O87cMuKx3IecAfxegiRB5ju', 1),
(12, 'jaime', 'Rivera', 'riverac63636@gmail.com', '1622507361159.png', '$2a$10$AUuuk3ECLj.ItCiPrfG2KutvLaIRUzes0ny10ddnPj/R1WfBJwacu', 1);



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


INSERT INTO `rawinfo` (`id`, `synopsis`, `launchDate`, `metacritic`, `metacriticUrl`, `rating`, `developer`, `genres`, `platforms`, `tags`, `recommendedAge`) VALUES
(1, '<p>Crash Bandicoot es la primera entrega de la serie de 16 títulos. Mientras que el juego cuenta con varios géneros: razas, beat &#39;em&#39;ups y platformers, la primera parte se concentra en el estilo de la platforming. El juego es desarrollado por Naughty Dog que actualmente es famoso por hacer Jax y Daxter, Uncharted y The Last of Us series. <br /> El juego cuenta con un protagonista de bandicoot autotitulado tratando de superar los obstáculos mientras se estrellan enemigos saltando y dándole vueltas y recogiendo frutas y máscaras que le dan varios bonos. Todos los niveles enfatizan la ejecución contra o en la pantalla. <br /> Crash Bandicoot cuenta una historia de un bandicoot mutado, atrapado en las islas Wumpa. Él lucha contra la corporación maligna el Doctor Neo Cortex que convierte a cada ser vivo en las bestias luchando unos contra otros. El juego cuenta con dos ending-usual y verdadero. Con este último final logrado mediante la recopilación de todas las gemas, es decir, limpiar el nivel sin muertes y recoger cada bono que hay que agarrar.</p>', '2021-01-07 00:00:00', 70, 'https://www.metacritic.com/game', 'recommended', 'Sony Interactive Entertainment', 'Action Adventure Platformer', 'PS Vita Android PlayStation PlayStation 3 PSP', 'Singleplayer exclusive', 'Todos 10+'),
(2, '<p>Forza Horizon 4 es el undécimo juego de la franquicia Forza de los juegos de carreras y el cuarto en la subserie Horizon.</p>\n<h3>Premisa</h3>\n<p>Forza Horizon 4 tiene lugar en un mundo abierto compartido que se basa libremente en el Reino Unido. Hasta 72 jugadores pueden compartir un servidor en el que participan en carreras juntas. También pueden comprar casas en el juego, que permiten a los jugadores desbloquear coches más rápidos y prebendas del conductor. Los controladores son personalizables hasta su ropa y emociones.</p>\n<h3>Tiempo y temporadas</h3>\n<p>Forza Horizon 4 tiene un cambio dinámico de tiempo y estaciones que cambian semanalmente. Las condiciones meteorológicas son sincronizadas y compartidas por todos los jugadores en el mismo servidor. El clima y las estaciones alteran el ambiente y por lo tanto el juego. Condiciones como la nieve, el barro y el hielo pueden influir no sólo en el estilo de conducción, sino también en qué áreas y rutas son accesibles durante la temporada. Sobre todo, los jugadores pueden conducir en el hielo cuando los lagos y los ríos se congelan. </p>\n<h3>Coches</h3>\n<p>Forza Horizon 4 cuenta con más de 450 vehículos con licencia de más de cien fabricantes de automóviles. Entre los pocos fabricantes notables que no fueron incluidos debido a problemas de licencia son Toyota y Lexus.</p>\n<h3>Modalidades</h3>\n<p>Aunque el juego está orientado hacia el juego multijugador en línea, también tiene un solo reproductor y modos multijugador locales. El juego también introduce un modo de editor de nivel llamado Route Creator que permite a los jugadores diseñar y personalizar nuevas rutas.</p>', '2018-10-02 00:00:00', 90, 'https://www.metacritic.com/game/pc/forza-horizon-4', 'exceptional', 'Playground Games', 'Racing Massively Multiplayer', 'Xbox One Xbox Series S/X PC', 'Singleplayer Steam Achievements Multiplayer Atmospheric Steam Cloud Full controller support Great Soundtrack Co-op Open World First-Person Online Co-Op Sandbox Exploration Cross-Platform Multiplayer exclusive PvP Family Friendly Cinematic Realistic VR 3rd-Person Perspective Driving Steam Trading Cards Online PvP Offroad explore street racing w10 exclusive Automobile Sim winter extreme autumn', 'Todos'),
(3, '<p>Forza Horizon 4 es el undécimo juego de la franquicia Forza de los juegos de carreras y el cuarto en la subserie Horizon.</p>\n<h3>Premisa</h3>\n<p>Forza Horizon 4 tiene lugar en un mundo abierto compartido que se basa libremente en el Reino Unido. Hasta 72 jugadores pueden compartir un servidor en el que participan en carreras juntas. También pueden comprar casas en el juego, que permiten a los jugadores desbloquear coches más rápidos y prebendas del conductor. Los controladores son personalizables hasta su ropa y emociones.</p>\n<h3>Tiempo y temporadas</h3>\n<p>Forza Horizon 4 tiene un cambio dinámico de tiempo y estaciones que cambian semanalmente. Las condiciones meteorológicas son sincronizadas y compartidas por todos los jugadores en el mismo servidor. El clima y las estaciones alteran el ambiente y por lo tanto el juego. Condiciones como la nieve, el barro y el hielo pueden influir no sólo en el estilo de conducción, sino también en qué áreas y rutas son accesibles durante la temporada. Sobre todo, los jugadores pueden conducir en el hielo cuando los lagos y los ríos se congelan. </p>\n<h3>Coches</h3>\n<p>Forza Horizon 4 cuenta con más de 450 vehículos con licencia de más de cien fabricantes de automóviles. Entre los pocos fabricantes notables que no fueron incluidos debido a problemas de licencia son Toyota y Lexus.</p>\n<h3>Modalidades</h3>\n<p>Aunque el juego está orientado hacia el juego multijugador en línea, también tiene un solo reproductor y modos multijugador locales. El juego también introduce un modo de editor de nivel llamado Route Creator que permite a los jugadores diseñar y personalizar nuevas rutas.</p>', '2018-10-02 00:00:00', 90, 'https://www.metacritic.com/game/pc/forza-horizon-4', 'exceptional', 'Playground Games', 'Racing Massively Multiplayer', 'Xbox One Xbox Series S/X PC', 'Singleplayer Steam Achievements Multiplayer Atmospheric Steam Cloud Full controller support Great Soundtrack Co-op Open World First-Person Online Co-Op Sandbox Exploration Cross-Platform Multiplayer exclusive PvP Family Friendly Cinematic Realistic VR 3rd-Person Perspective Driving Steam Trading Cards Online PvP Offroad explore street racing w10 exclusive Automobile Sim winter extreme autumn', 'Todos'),
(4, '<p>Forza Horizon 4 es el undécimo juego de la franquicia Forza de los juegos de carreras y el cuarto en la subserie Horizon.</p>\n<h3>Premisa</h3>\n<p>Forza Horizon 4 tiene lugar en un mundo abierto compartido que se basa libremente en el Reino Unido. Hasta 72 jugadores pueden compartir un servidor en el que participan en carreras juntas. También pueden comprar casas en el juego, que permiten a los jugadores desbloquear coches más rápidos y prebendas del conductor. Los controladores son personalizables hasta su ropa y emociones.</p>\n<h3>Tiempo y temporadas</h3>\n<p>Forza Horizon 4 tiene un cambio dinámico de tiempo y estaciones que cambian semanalmente. Las condiciones meteorológicas son sincronizadas y compartidas por todos los jugadores en el mismo servidor. El clima y las estaciones alteran el ambiente y por lo tanto el juego. Condiciones como la nieve, el barro y el hielo pueden influir no sólo en el estilo de conducción, sino también en qué áreas y rutas son accesibles durante la temporada. Sobre todo, los jugadores pueden conducir en el hielo cuando los lagos y los ríos se congelan. </p>\n<h3>Coches</h3>\n<p>Forza Horizon 4 cuenta con más de 450 vehículos con licencia de más de cien fabricantes de automóviles. Entre los pocos fabricantes notables que no fueron incluidos debido a problemas de licencia son Toyota y Lexus.</p>\n<h3>Modalidades</h3>\n<p>Aunque el juego está orientado hacia el juego multijugador en línea, también tiene un solo reproductor y modos multijugador locales. El juego también introduce un modo de editor de nivel llamado Route Creator que permite a los jugadores diseñar y personalizar nuevas rutas.</p>', '2018-10-02 00:00:00', 90, 'https://www.metacritic.com/game/pc/forza-horizon-4', 'exceptional', 'Playground Games', 'Racing Massively Multiplayer', 'Xbox One Xbox Series S/X PC', 'Singleplayer Steam Achievements Multiplayer Atmospheric Steam Cloud Full controller support Great Soundtrack Co-op Open World First-Person Online Co-Op Sandbox Exploration Cross-Platform Multiplayer exclusive PvP Family Friendly Cinematic Realistic VR 3rd-Person Perspective Driving Steam Trading Cards Online PvP Offroad explore street racing w10 exclusive Automobile Sim winter extreme autumn', 'Todos'),
(5, '<p>Toma el control de la mujer más famosa en los juegos, en la aventura original de Lara que lo empezó todo. Explorar mundos prehistóricos masivos, luchar contra las bestias salvajes y burlar a los cazadores de tesoros rivales. Cargada de intriga, emoción y peligro, la aventura de Lara la lleva de las antiguas ruinas de los Incans a la ciudad perdida de la Atlántida en busca del misterioso Scion.</p>', '1996-10-25 00:00:00', 88, 'https://www.metacritic.com/game/xbox-360/tomb-raider', 'recommended', 'Core Design', 'Action', 'Android PSP PlayStation 3 PC SEGA Saturn iOS PS Vita PlayStation', 'city treasure', 'Adolescentes');


INSERT INTO `products` (`id`, `name`, `slug`, `description`, `price`, `image1`, `image2`, `category`, `hasEdition`, `edition`,`homeTags`, `stock`, `isNew`, `rawInfo`) VALUES
(1, 'The last of us part II', 'the-last-of-us-part-ii', 'The Last of Us Part II es la secuela del juego de zombies postapocalíptico The Last of Us.', '205000', 'last-of-us-detail.png', 'tlou2.png', 18, 1, 'Standard;205000, Coleccionista;350000, Game of the year;250000',1 ,10, 1, NULL),
(2, 'PS4 Pro', 'consola-ps4-pro', 'Ps4 Pro 1tb + Juego Fisico Spiderman. Nuevo y sellado. Garantia de 1 año. Control, Cable HDMI, 4K. Nueva y Sellada.', '2199000', 'ps4.jpg', 'ps4.jpg', 7, 1, 'Standard;2199000',1 ,10, 1, NULL),
(3, 'Xbox Series X', 'xbox-series-x', 'Xbox Series X (Project Scarlett hasta el anuncio oficial de su nombre) es la consola de novena generación de Microsoft, la cuarta de la familia de hardware de entretenimiento de la compañía de Redmond. La nueva Xbox es una máquina que es cuatro veces más potente que la propia Xbox One X y ha sido diseñada por el mismo equipo de ingenieros que gestaron a Xbox One X, y también que han marcado un antes y un después para el multijugador con Xbox Live.', '3199000', 'xbox-controller.png', 'xbox-controller.png', 11, 0, NULL,1 , 9, 1, NULL),
(4, 'Alienware M15', 'alienware-m15', 'Dell Alienware M15 I7 10ma 16b 512ssd Rtx2070 8gb', '9599000', 'alienware.jpg', 'alienware.jpg', 31, 0, NULL,3 , 2, 1, NULL),
(5, 'Assassins Creed Valhalla', 'assassins-creed-valhalla', 'Conviértete en Eivor, un poderoso saqueador vikingo y lidera a tu clan desde las inclementes costas de Noruega a un nuevo hogar en medio de las exuberantes tierras de cultivo de la Inglaterra del siglo IX. Explora un hermoso y misterioso mundo abierto donde te enfrentarás a brutales enemigos, saquearás fortalezas, construirás el nuevo asentamiento de tu clan y forjarás alianzas para conseguir la gloria y obtener un lugar en el Valhalla.\r\n\r\nInglaterra, en la época de los vikingos, es una nación fracturada llena de amos mezquinos y reinos en guerra. Debajo de todo el caos yace una tierra salvaje y llena de abundancia que espera a un nuevo conquistador. ¿Serás tú?', '262000', 'ac-valhalla.png', 'ac-valhalla.png', 18, 1, 'Game of the year;270000, Standard;210000, Digital;140000',1 , 2, 1, NULL),
(6, 'Monitor Curvo', 'monitor-curvo', 'Monitor curvo Samsung full HD 4K', '1200000', 'curved-monitor.png', 'curved-monitor.png', 38, 0, NULL,4 , 10, 1, NULL),
(7, 'Cyber Punk 2077', 'cyber-punk-2077', 'Cyberpunk 2077 es un videojuego desarrollado y publicado por CD Projekt, que se lanzó para Microsoft Windows, PlayStation 4, y Xbox One el 10 de diciembre de 2020, y posteriormente en PlayStation 5, Xbox Series X|S y Google Stadia. Siendo una adaptación del juego de rol de mesa Cyberpunk 2020, se establece cincuenta y siete años más tarde en la ciudad distópica de Night City, California', '190000', 'cyberpunk-cover.png', 'cyber.jpg', 18, 0, '',1 , 4, 1, NULL),
(8, 'Headphones stinger', 'headphones-stinger', 'Experimenta la libertad inalámbrica y el sonido surround 7.1 a un costo imbatible. Los HyperX Cloud Stinger Core son audífonos livianos para gaming con una gran calidad de sonido en un resistente paquete, altamente confiable. El micrófono con cancelación de ruido te permite chatear con amigos y asegura que tengas una nítida comunicación con tus compañeros. Sumérgete en el entretenimiento con el sonido surround virtual 7.1 a través del software NGENUITY de HyperX Cloud Stinger Core también cuenta con controles integrados para que puedas ajustar el volumen de los audífonos desde la orejera y un cómodo micrófono que al girar se pone en modo mudo.', '350000', 'hyperx_cloud_stinger_core_ps4.jpg', 'hyperx_cloud_stinger_core_ps4.jpg', 28, 0, '',1 , 1, 1, NULL),
(9, 'Mario 3d World', 'mario-3d-world', 'El gato fuera de la bolsa Super Mario 3D World está llegando al sistema Nintendo Switch\r\nEl juego Super Mario 3D World + Bowser Fury cuenta con el mismo gran juego cooperativo\r\nniveles creativos y encendidos como el juego original, pero también mucho más. Más detalles sobre lo divertido que este juego tiene para ofrecer será revelado pronto\r\n¡Enciende, forma equipo, uno para salvar el Reino Sprixie!', '290000', 'mario 3dworld main.jpg', 'mario 3dworld second.jpg', 25, 0, '',1 , 10, 1, NULL),
(10, 'play station 5', 'play-station-5', 'PS5 o PlayStation 5 es el nuevo hardware de entretenimiento o consola de Sony, y sale a la venta el 19 de noviembre en España y el 12 en otras regiones como Estados Unidos, Japón, Australia, México, Corea del Sur y Nueva Zelanda. Con un precio de 499 euros o 499 dólares en su versión estándar, es decir la que tiene soporte óptico, mientra que PlayStation 5 Digital Edition vale una cantidad más económica: 399 euros o 399 dólares.\r\n\r\nLa videoconsola tiene por mando el ya conocido DualSense, y es una máquina que tiene por objetivo de ofrecer un nuevo salto en lo gráfico en PS5 respecto a PS4 y situar como estándar la resolución 4K para la ejecución de videojuegos y, en muchas ocasiones, también los 60FPS. Aunque, eso sí, también hay soporte para resoluciones 8K entre otras funciones muy interesantes a nivel tecnológica.', '3500000', 'ps5-controller.png', 'ps5-dualshock.jpg', 6, 1, 'Digital;3000000,Lector Bluray;3500000',1 , 2, 1, NULL),
(11, 'Silla gamer tronos', 'silla-gamer-tronos', 'Silla gamer comfortable y ergonómica', '1500000', 'silla_gamer_tronos.jpg', 'silla_gamer_tronos.jpg', 36, 0, NULL,4 , 1, 1, NULL),
(12, 'crash bandicoot 4', 'crash-bandicoot-4', 'LOS RETORCIDOS VILLANOS NEO CORTEX Y EL DR. N. TROPY POR FIN HAN ESCAPADO DE LA PRISIÓN INTERDIMENSIONAL Y HAN DEJADO UN AGUJERO DEL TAMAÑO DE UN CIENTÍFICO MALVADO EN EL UNIVERSO. AHORA, SU PLAN NO SOLO RESIDE EN CONQUISTAR ESTA DIMENSIÓN, QUIEREN CONQUISTARLAS TODAS, Y DEPENDE DE CRASH Y COCO QUE ESO NO OCURRA. LA PLAYA N. SANITY ES DONDE COMIENZA LA AVENTURA DE CRASH Y DONDE LA RETOMAMOS EN CRASH 4, PERO LAS COSAS HAN CAMBIADO DESDE LA PRIMERA VEZ QUE LA VIMOS HACE TANTOS AÑOS. EN CRASH 4, VERÉIS ESOS CAMBIOS EN EL JUEGO, Y PODRÉIS APRECIAR NUESTRO ESTILO ARTÍSTICO', '184000', 'crash4.png', 'crash4-portada.jpg', 18, 0, NULL,1 , 2, 1, 1),
(13, 'Forza Horizon 4', 'forza-horizon-4', 'Forza Horizon 4 - Xbox One', '264012', 'forza horizon.jpg', 'forza horizon portada.jpg', 24, 0, NULL,2 , 12, 1, 2),
(14, 'Forza Horizon 4', 'forza-horizon-4', 'Forza Horizon 4 Nuevo', '45345', 'forza horizon.jpg', 'forza horizon portada.jpg', 22, 0, NULL,3 , 43, 1, 3),
(15, 'Forza Horizon 4', 'forza-horizon-4', 'Forza horizon 4 nuevo neuvco', '323213', 'forza horizon portada.jpg', 'forza horizon.jpg', 23, 0, NULL,4 , 1, 1, 4),
(16, 'Shadow of the Tomb Raider', 'shadow-of-the-tomb-raider', 'Shadow of the tomb raider', '190000', 'tomb raider 1.jpg', 'tomb raider 2.jfif', 18, 0, NULL,2 , 2, 1, 5);

INSERT INTO `gamebox`.`shoppingcartstatus`
(
`status`)
VALUES
("CREATED"), ("PENDING"), ("PAYED"), ("REJECTED");

--
-- Volcado de datos para la tabla `shoppingcart`
--

INSERT INTO `shoppingcart` (`id`, `user`, `itemsQuantity`, `totalPrice`, `date`, `shoppingCartStatus`) VALUES
(1, 1, 5, '3061000', '2021-04-18 20:06:07', 3),
(2, 1, 4, '660345', '2021-05-28 19:54:55', 3),
(3, 1, 10, '33932345', '2021-05-31 01:33:56', 3),
(4, 1, 3, '2839000', '2021-05-31 01:46:32', 3),
(5, 1, 2, '229345', '2021-05-31 01:47:50', 3),
(6, 1, 1, '184000', '2021-05-31 01:47:50', 3),
(7, 1, 5, '6140000', '2021-05-31 23:15:50', 1);

--
-- Volcado de datos para la tabla `shoppingcartproducts`
--

INSERT INTO `shoppingcartproducts` (`id`, `product`, `shoppingCart`, `hasEdition`, `edition`, `price`, `quantity`, `image`, `category`) VALUES
(1, 1, 1, 1, 'Standard;205000, Coleccionista;350000, Game of the year;250000', '205000', 2, 'tlou2.png', 18),
(2, 2, 1, 1, 'Standard;2199000', '2199000', 1, 'ps4.jpg', 7),
(3, 5, 1, 1, 'Game of the year;270000, Standard;210000, Digital;140000', '262000', 1, 'ac-valhalla.png', 18),
(4, 7, 1, 0, '', '190000', 1, 'cyber.jpg', 18),
(5, 14, 2, 0, '', '45345', 1, 'forza horizon portada.jpg', 22),
(6, 1, 2, 1, 'Standard;205000, Coleccionista;350000, Game of the year;250000', '205000', 3, 'tlou2.png', 18),
(7, 10, 3, 1, 'Digital;3000000,Lector Bluray;3500000', '3500000', 3, 'ps5-dualshock.jpg', 6),
(8, 14, 3, 0, '', '45345', 1, 'forza horizon portada.jpg', 22),
(9, 9, 3, 0, '', '290000', 1, 'mario 3dworld second.jpg', 25),
(10, 4, 3, 0, '', '9599000', 2, 'alienware.jpg', 31),
(11, 3, 3, 0, '', '3199000', 1, 'xbox-controller.png', 11),
(12, 8, 3, 0, '', '350000', 2, 'hyperx_cloud_stinger_core_ps4.jpg', 28),
(13, 8, 4, 0, '', '350000', 1, 'hyperx_cloud_stinger_core_ps4.jpg', 28),
(14, 2, 4, 1, 'Standard;2199000', '2199000', 1, 'ps4.jpg', 7),
(15, 9, 4, 0, '', '290000', 1, 'mario 3dworld second.jpg', 25),
(16, 9, 4, 0, '', '290000', 1, 'mario 3dworld second.jpg', 25),
(17, 12, 5, 0, '', '184000', 1, 'crash4-portada.jpg', 18),
(18, 12, 6, 0, '', '184000', 1, 'crash4-portada.jpg', 18),
(19, 14, 5, 0, '', '45345', 1, 'forza horizon portada.jpg', 22),
(20, 14, 5, 0, '', '45345', 1, 'forza horizon portada.jpg', 22),
(21, 2, 7, 1, 'Standard;2199000', '2199000', 1, 'ps4.jpg', 7),
(22, 3, 7, 0, '', '3199000', 1, 'xbox-controller.png', 11),
(23, 5, 7, 1, 'Game of the year;270000, Standard;210000, Digital;140000', '262000', 1, 'ac-valhalla.png', 18),
(24, 7, 7, 0, '', '190000', 1, 'cyber.jpg', 18),
(25, 9, 7, 0, '', '290000', 1, 'mario 3dworld second.jpg', 25);



