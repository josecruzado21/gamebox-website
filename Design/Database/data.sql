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

INSERT INTO `gamebox`.`products`
(
`name`,
`slug`,
`description`,
`price`,
`image1`,
`image2`,
`category`,
`hasEdition`,
`edition`,
`stock`,
`isNew`,
`rawInfo`)
VALUES
(
'The last of us part II',
'the-last-of-us-part-ii',
'The Last of Us Part II es la secuela del juego de zombies postapocalíptico The Last of Us.',
205000,
'last-of-us-detail.png',
'tlou2.png',
18,
1,
'Standard, Coleccionista, Game of the year ',
10,
1,
null);


INSERT INTO `gamebox`.`products`
(
`name`,
`slug`,
`description`,
`price`,
`category`,
`hasEdition`,
`edition`,
`stock`,
`isNew`,
`rawInfo`)
VALUES
(
'PS4 Pro',
'consola-ps4-pro',
'Ps4 Pro 1tb + Juego Fisico Spiderman. Nuevo y sellado. Garantia de 1 año. Control, Cable HDMI, 4K. Nueva y Sellada.',
2199000,
7,
1,
'Standard',
10,
1,
null);

INSERT INTO `gamebox`.`products`
(
`name`,
`slug`,
`description`,
`price`,
`category`,
`hasEdition`,
`edition`,
`stock`,
`isNew`,
`rawInfo`)
VALUES
(
'Xbox Series X',
'xbox-series-x',
'Xbox Series X (Project Scarlett hasta el anuncio oficial de su nombre) es la consola de novena generación de Microsoft, la cuarta de la familia de hardware de entretenimiento de la compañía de Redmond. La nueva Xbox es una máquina que es cuatro veces más potente que la propia Xbox One X y ha sido diseñada por el mismo equipo de ingenieros que gestaron a Xbox One X, y también que han marcado un antes y un después para el multijugador con Xbox Live.',
3199000,
11,
0,
null,
9,
1,
null);


INSERT INTO `gamebox`.`products`
(
`name`,
`slug`,
`description`,
`price`,
`category`,
`hasEdition`,
`edition`,
`stock`,
`isNew`,
`rawInfo`)
VALUES
(
'Alienware M15',
'alienware-m15',
'Dell Alienware M15 I7 10ma 16b 512ssd Rtx2070 8gb',
9599000,
30,
0,
null,
2,
1,
null);
