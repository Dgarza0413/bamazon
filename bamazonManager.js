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
});

function bamazonManger() {
    inquirer.prompt([
        {
            type: "list",
            message: "Select an Option",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "optionSelection"
        }
    ]).then(function (inquirerResponse) {
        if (inquirerResponse.optionSelection === "View Products for Sale") {
            console.log("Products for sale has been Selected")
            viewProducts()
        }
        if (inquirerResponse.optionSelection === "View Low Inventory") {
            console.log("View Low Inventory has been Selected")
            viewLowInv()
        }
        if (inquirerResponse.optionSelection === "Add to Inventory") {
            console.log("Add to Inventory has been Selected")
            addInv()

        }
        if (inquirerResponse.optionSelection === "Add New Product") {
            console.log("Add New Product has been Selected")
            addNewItem()
        }
        if (inquirerResponse.optionSelection === "Exit") {
            console.log("Good Bye")
            connection.end()
        }
    })
}

function viewProducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["Product ID", "Product Name", "Product Stock", "Product Price", "Department"],
            colWidths: [12, 20, 15, 10, 15]
        })
        for (var i = 0; i < res.length; i++) {
            table.push(
                [`${res[i].product_id}`,
                `${res[i].product_name}`,
                `${res[i].product_stock}`,
                `${res[i].product_price}`,
                `${res[i].product_department}`]
            )
        }
        console.log(table.toString());
        bamazonManger()
    })
}

function viewLowInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["Product ID", "Product Name", "Product Stock", "Product Price", "Department"],
            colWidths: [12, 20, 15, 10, 15]
        })
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_stock < 15) {
                table.push(
                    [
                        `${res[i].product_id}`,
                        `${res[i].product_name}`,
                        `${res[i].product_stock}`,
                        `${res[i].product_price}`,
                        `${res[i].product_department}`
                    ]
                )
            }
        }
        console.log("ALL ITEMS BELOW 15 BELOW")
        console.log(table.toString());
        bamazonManger()
    })
}

function addInv() {
    inquirer.prompt([
        {
            type: "input",
            message: "Restock what item id?",
            name: "restockID"
        },
        {
            type: "input",
            message: "Order how many?",
            name: "restockQuantity"
        },
        {
            type: "confirm",
            message: "Confirm restock order",
            name: "restockConfirm"
        }
    ]).then(function (inquirerResponse) {
        var queryUpdate = "UPDATE products SET product_stock = product_stock + ? WHERE product_id = ?"
        connection.query(queryUpdate, [inquirerResponse.restockQuantity, inquirerResponse.restockID],
            function (err, res) {
                if (err) throw err;
                console.log("Purchase complete!!")
                bamazonManger()
            })
    })
}

function addNewItem() {
    inquirer.prompt([
        {
            type: "input",
            message: "Name of new product",
            name: "productName"
        },
        {
            type: "input",
            message: "Price of new product",
            name: "productPrice"
        },
        {
            type: "input",
            message: "Department classification",
            name: "productDepartment"
        },
        {
            type: "input",
            message: "Quantity of Item",
            name: "productQuantity"
        }
    ]).then(function (inquirerResponse) {
        var query = "INSERT INTO products(product_name, product_price, product_department, product_stock) VALUES (?, ?, ?, ?)";
        connection.query(query,
            [inquirerResponse.productName,
            inquirerResponse.productPrice,
            inquirerResponse.productDepartment,
            inquirerResponse.productQuantity],
            function (err, res) {
                if (err) throw err;
                console.log("items added")
                viewProducts()
                console.log("Redirecting to bamazonManager")
                bamazonManger()
            }
        )
    })
}