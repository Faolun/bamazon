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
("Chain Shirt", "Armor", 50.25, 20), 
("Half Plate", "Armor", 750.00, 2), 
("Shield", "Armor", 10.75, 10), 
("Padded", "Armor", 5.77, 30), 
("Chest", "Adventuring Gear", 5.99, 5), 
("Fishing Tackle", "Adventuring Gear", 1.99, 30), 
("Dulcimer", "Tools", 8.35, 3), 
("Potter's Tools", "Tools", 10.27, 5), 
("Thieves' Tools", "Tools", 25.00, 2), 
("Pint of Honey", "Trade Goods", 1.00, 7), 
("Gallon of Milk", "Trade Goods", 1.00, 12), 
("Pound of Ginseng", "Trade Goods", 1.00, 5), 
("Longsword", "Weapons", 15.50, 4), 
("Halbred", "Weapons", 20.00, 1);


CREATE TABLE departments(
    depId TINYINT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    overHeadCosts DECIMAL(10,2) NOT NULL,
    totalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(depId)
    );

INSERT INTO departments(department_name, overHeadCosts, totalSales)

VALUES 
("Armor", 10000.00, 400.50),
("Adventuring Gear", 20000.00, 12000.00),
("Tools", 15000.00, 5000.00),
("Trade Goods", 30000.00, 12000.00),
("Weapons", 12000.00, 15000.00);
