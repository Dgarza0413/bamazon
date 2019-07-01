// inquirer promrt a list of menu options (challenge #2)
require('dotenv').config()

var Table = require("cli-table");
var inquirer = require("inquirer")
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.BAMAZON_DB_PASSWORD,
    database: "bamazon_db",
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n")
    bamazonManger()
    // connection.end()
});

// - products for sale
// * app lists every available item: ids, names, prices, and quantities
// - low inventory
// * lists all inventory count lower than five
// - add to inventory
// displays a prompt to add more of any item in the store
// - add new product
// allows manager to input a new product into store
function bamazonManger() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select an Option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
            name: "optionSelection"
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.optionSelection === "View Products for Sale") {
            console.log("Products for sale has been Selected")
            viewProducts()
        }
        if (inquirerResponse.optionSelection === "View Low Inventory") {
            console.log("View Low Inventory has been Selected")
        }
        if (inquirerResponse.optionSelection === "Add to Inventory") {
            console.log("Add to Inventory has been Selected")
        }
        if (inquirerResponse.optionSelection === "Add New Product") {
            console.log("Add New Product has been Selected")
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["Product ID", "Product Name", "Product Stock", "Product Price", "Total"],
            colWidths: [12, 20, 15, 10, 10]
        })
        for (var i = 0; i < res.length; i++) {
            table.push(
                [`${res[i].product_id}`,
                `${res[i].product_name}`,
                `${res[i].product_stock}`,
                `${res[i].product_price}`]
            )
        }
        console.log(table.toString());
    })
}
