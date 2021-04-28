CREATE DATABASE  IF NOT EXISTS `gamebox` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `gamebox`;

CREATE TABLE `Categories` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	`slug` varchar(500) NOT NULL,
	`parent_id` INT DEFAULT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Users` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`firstName` varchar(500) NOT NULL,
	`lastName` varchar(500) NOT NULL,
	`email` varchar(500) NOT NULL,
	`avatar` varchar(500) NOT NULL DEFAULT 'avatar.jpg',
	`password` varchar(500) NOT NULL,
	`type` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `UserType` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`type` varchar(500) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `Products` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`name` varchar(500) NOT NULL,
	`slug` varchar(500) NOT NULL,
	`description` TEXT NOT NULL,
	`price` DECIMAL NOT NULL,
	`image1` varchar(500) NOT NULL DEFAULT 'image1.jpg',
	`image2` varchar(500) DEFAULT 'image2.jpg',
	`category` INT NOT NULL,
	`hasEdition` INT NOT NULL DEFAULT 0,
	`edition` varchar(500),
	`stock` INT NOT NULL,
	`isNew` INT NOT NULL DEFAULT 1,
	`rawInfo` INT DEFAULT NULL,
	PRIMARY KEY (`id`)
);


CREATE TABLE `ShoppingCartStatus` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`status` varchar(50) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `ShoppingCart` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`user` INT NOT NULL,
	`itemsQuantity` INT NOT NULL DEFAULT 0,
	`totalPrice` DECIMAL NOT NULL DEFAULT 0,
	`date` DATETIME NOT NULL,
	`shoppingCartStatus` INT NOT NULL DEFAULT 1,
	PRIMARY KEY (`id`)
);



CREATE TABLE `ShoppingCartProducts` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`product` INT NOT NULL,
	`shoppingCart` INT NOT NULL,
	`hasEdition` INT NOT NULL DEFAULT 0,
	`edition` varchar(500),
	`price` DECIMAL NOT NULL,
	`quantity` SMALLINT(6) NOT NULL,
	`image` varchar(500) NOT NULL,
	`category` INT NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE `RawInfo` (
	`id` INT NOT NULL AUTO_INCREMENT,
	`synopsis` TEXT NOT NULL,
	`launchDate` DATETIME NOT NULL,
	`metacritic` INT,
	`metacriticUrl` varchar(500),
	`rating` varchar(500) NOT NULL,
	`developer` varchar(500) NOT NULL,
	`genres` TEXT NOT NULL,
	`platforms` TEXT NOT NULL,
	`tags` TEXT NOT NULL,
	`recommendedAge` varchar(500) NOT NULL,
	PRIMARY KEY (`id`)
);




ALTER TABLE `Categories` ADD CONSTRAINT `Categories_fk0` FOREIGN KEY (`parent_id`) REFERENCES `Categories`(`id`);

ALTER TABLE `Users` ADD CONSTRAINT `Users_fk0` FOREIGN KEY (`type`) REFERENCES `UserType`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk0` FOREIGN KEY (`category`) REFERENCES `Categories`(`id`);

ALTER TABLE `Products` ADD CONSTRAINT `Products_fk1` FOREIGN KEY (`rawInfo`) REFERENCES `RawInfo`(`id`);

ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_fk0` FOREIGN KEY (`user`) REFERENCES `Users`(`id`);

ALTER TABLE `ShoppingCart` ADD CONSTRAINT `ShoppingCart_fk1` FOREIGN KEY (`shoppingCartStatus`) REFERENCES `shoppingCartStatus`(`id`);

ALTER TABLE `ShoppingCartProducts` ADD CONSTRAINT `ShoppingCartProducts_fk0` FOREIGN KEY (`product`) REFERENCES `Products`(`id`);

ALTER TABLE `ShoppingCartProducts` ADD CONSTRAINT `ShoppingCartProducts_fk1` FOREIGN KEY (`shoppingCart`) REFERENCES `ShoppingCart`(`id`);

ALTER TABLE `ShoppingCartProducts` ADD CONSTRAINT `ShoppingCartProducts_fk2` FOREIGN KEY (`category`) REFERENCES `Categories`(`id`);
