DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(128) NULL,
  department_name VARCHAR(128) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO 
products (product_name, department_name,  price, stock_quantity)

VALUES 
("Chain Shirt", "Armor", 50.00, 20), 
("Half Plate", "Armor", 750.00, 2), 
("Shield", "Armor", 10.00, 10), 
("Padded", "Armor", 5.00, 30), 
("Chest", "Adventuring Gear", 5.00, 5), 
("Fishing Tackle", "Adventuring Gear", 1.00, 30), 
("Dulcimer", "Tools", 8.00, 3), 
("Potter's Tools", "Tools", 10.00, 5), 
("Thieves' Tools", "Tools", 25.00, 2), 
("Pint of Honey", "Trade Goods", 1.00, 7), 
("Gallon of Milk", "Trade Goods", 1.00, 12), 
("Pound of Ginseng", "Trade Goods", 1.00, 5), 
("Longsword", "Weapons", 15.00, 4), 
("Halbred", "Weapons", 20.00, 1)
