DROP DATABASE IF EXISTS `mok.shop`;
CREATE DATABASE IF NOT EXISTS `mok.shop`
CHARACTER SET utf8
COLLATE utf8_general_ci;

USE `mok.shop`;

CREATE TABLE IF NOT EXISTS t_users (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(50) DEFAULT NULL,
  is_admin tinyint(4) NOT NULL DEFAULT 0,
  email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (id)
)
ENGINE = INNODB
AUTO_INCREMENT = 1
CHARACTER SET utf8
COLLATE utf8_general_ci;