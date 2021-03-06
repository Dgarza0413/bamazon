//require packages installed from npm
require('dotenv').config()
var mysql = require("mysql");
var inquier = require("inquirer");
var Table = require("cli-table");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.BAMAZON_DB_PASSWORD,
    database: "bamazon_db",
})

//call the mysql createConnection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n")
    bamazonHome();
});

//READ UPDATED table
function bamazonHome() {
    inquier.prompt([
        {
            type: "list",
            message: "Welcome to bamazon How may we help you",
            choices: ["Purchase", "Exit"],
            name: "listOptions"
        }
    ]).then(function (inquierResponse) {
        switch (inquierResponse.listOptions) {
            case "Purchase":
                console.log("purchase selected, pick your item")
                readItems();
                break;
            case "Exit":
                console.log("Thank you for shopping at bamazon");
                connection.end();
                break;
        }
    })
}

//UPDATE table
function purchaseItem() {
    inquier.prompt([
        {
            type: "input",
            message: "Select Item by ID",
            name: "itemSelection"
        },
        {
            type: "input",
            message: "How many would you like?",
            name: "quantitySelection",
        },
        {
            type: "confirm",
            message: "Would you like to checkout?",
            name: "confirmSelection"
        }
    ]).then(function (inquierResponse) {
        var checkID = "SELECT * FROM products WHERE product_id = ?"
        var updateProducts = 'UPDATE products SET product_stock = product_stock - ? WHERE product_id = ?'
        var reciept = "SELECT * FROM products WHERE product_id = ?"
        var query = connection.query(checkID, [inquierResponse.itemSelection],
            function (err, res) {
                if (err) throw err;
                if (res[0].product_stock > inquierResponse.quantitySelection) {
                    connection.query(updateProducts, [inquierResponse.quantitySelection, inquierResponse.itemSelection],
                        function (err, res) {
                            if (err) throw err;
                            console.log("Purchase complete!!")
                        })
                    connection.query(reciept,
                        [inquierResponse.itemSelection, inquierResponse.quantitySelection],
                        function (err, res) {
                            if (err) throw err;
                            var table = new Table({
                                head: ["ID", "Product Name", "Quantity", "Product Price", "Total"],
                                colWidths: [12, 20, 15, 15, 10]
                            })
                            for (var i = 0; i < res.length; i++) {
                                table.push(
                                    [
                                        `${res[i].product_id}`,
                                        `${res[i].product_name}`,
                                        `${inquierResponse.quantitySelection}`,
                                        `${res[i].product_price}`,
                                        `${inquierResponse.quantitySelection * res[i].product_price}`
                                    ]
                                )
                            }
                            console.log("Here is your reciept")
                            console.log("")
                            console.log(table.toString());
                            console.log("")
                            bamazonHome();
                        });
                } else {
                    console.log("this item is unavailable returning to home")
                    bamazonHome();
                }
            })
    })
}

//READ table
function readItems() {
    console.log("Pulling all objects...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        var table = new Table({
            head: ["Product ID", "Product Name", "Product Price", "Product Stock", "Product Department"],
            colWidths: [12, 20, 15, 15, 20]
        })
        for (var i = 0; i < res.length; i++) {
            table.push(
                [`${res[i].product_id}`,
                `${res[i].product_name}`,
                `${res[i].product_price}`,
                `${res[i].product_stock}`,
                `${res[i].product_department}`]
            )
        }
        console.log(table.toString());
        purchaseItem();
    })
}