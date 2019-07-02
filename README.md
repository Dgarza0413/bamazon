# bamazon
An Amazon-like storefront with mySQL skillsets and node to bring in orders from customers and deplete stock from the store's inventory

##key items
This assignment is split between three different sections
    - a customer based interaction
    - a manager based interaction
    - a supervisor based interaction

##About customer js
The app starts with a prompt that is using the inquirer npm package that calls a list of two different options being a purchase and exit.

  * When the purchase item is selected it prompts two different instructions
  1. instructs the user to provide an id
  2. instructs the user to provide a quantity

  * After the order is placed the application performs a check within javascript for product_stock in MYSQL and continues if the product is available with the quantity that was asked for.
  * a reciept is then printed with the total quantity requested as well as the price that is marked with the item.