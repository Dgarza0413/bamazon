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

## About Manager js
The app starts with another prompt utilizing the inquirer package that will call five different options being:
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product
    * Exit

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.