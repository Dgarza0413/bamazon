# bamazon
An Amazon-like storefront with mySQL skillsets and node to bring in orders from customers and deplete stock from the store's inventory

# synopsis
This assignment is split between three different sections that utilizes node and mysql to query and display data using update, select, and from to call our data as well as CRUD methods for how we interact with our database. 

    1. a bamazonCustomer.js based interaction that uses a mysql query for reading and substracting from the data table
    2. a bamazonManager.js based interaction that uses a mysql query for reading and adding to the data table as well as insert
    3. a bamazonSupervisor.js based interaction .... To be completed

## About customer js
The app starts with a prompt that is using the inquirer npm package that calls a list of two different options being a purchase and exit.

  1. When the purchase item is selected it prompts two different instructions
    * instructs the user to provide an id
    * instructs the user to provide a quantity

  2. After the order is placed the application performs a check within javascript for product_stock in MYSQL and continues if the product is available with the quantity that was asked for.
  3. a reciept is then printed with the total quantity requested as well as the price that is marked with the item.