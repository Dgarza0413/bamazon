DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	product_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    product_price DECIMAL(11, 2) NOT NULL,
    product_department VARCHAR(30) NOT NULL,
    product_stock INTEGER(11) NOT NULL,
    total_cost INTEGER(11) NULL
    PRIMARY KEY (product_id)
);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("green-shirt", 10.99, "clothing", 100);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("blue-shirt", 12.99, "clothing", 100);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("red-shirt", 11.99, "clothing", 100);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("television", 349.99, "electronics", 50);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("laptop", 599.99, "electronics", 20);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("cellphone", 799.99, "electronics", 40);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("washing machine", 429.99, "appliances", 10);

INSERT INTO products(product_name, product_price, product_department, product_stock)
VALUES ("dryer machine", 529.99, "appliances", 30);


CREATE TABLE departments(
	department_id INTEGER AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY(department_id)
);

INSERT INTO departments(department_name)
VALUES ("electronics");

INSERT INTO departments(department_name)
VALUES ("clothing");

INSERT INTO departments(department_name)
VALUES ("appliances");