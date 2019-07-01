require('dotenv').config()
// in this file we will display all of the items available for purchase
//we first can require our mysql database
var mysql = require("mysql");
var inquier = require("inquirer");
var Table = require("cli-table");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.BAMAZON_DB_PASSWORD,
    database: "bamazon_db",
})

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
        if (inquierResponse.listOptions === "Purchase") {
            console.log("Purchase selected, pick your item")
            readItems();
        }
        if (inquierResponse.listOptions === "Exit") {
            console.log("Thank you for shopping at bamazon");
            connection.end();
        }
    })
}

function checkQuantity(id) {
    // return true
    var checkID = "SELECT * FROM products WHERE product_id = ?"
    connection.query(checkID, [id],
        function (err, res) {
            console.log(res.length)
            if (err) throw err;

            // res[0].product_stock > 0 ? true : false
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
        var query = connection.query(checkID, [inquierResponse.itemSelection],
            function (err, res) {
                console.log("this is id " + inquierResponse.itemSelection)
                console.log("this is quantity: " + inquierResponse.quantitySelection)
                if (err) throw err;

                if (res[0].product_stock > inquierResponse.quantitySelection) {
                    connection.query(updateProducts, [inquierResponse.quantitySelection, inquierResponse.itemSelection],
                        function (err, res) {
                            if (err) throw err;
                            console.log("Purchase complete!!")
                            console.log(res.affectedRows + " products updated")
                            bamazonHome();
                        })
                    // reciept(inquierResponse.itemSelection, inquierResponse.quantitySelection)
                } else {
                    console.log("this is false")
                }
            })






        // if (query) {
        //     console.log("This is true")
        //     // var updateProducts = 'UPDATE products SET product_stock = product_stock - ? WHERE product_id = ?'
        //     // connection.query(updateProducts,
        //     //     [inquierResponse.quantitySelection, inquierResponse.itemSelection],
        //     //     function (err, res)
        //     //     // if (checkQuantity() === true) {
        //     //     {
        //     //         if (err) throw err;
        //     //         console.log("Purchase complete!!")
        //     //         console.log(res.affectedRows + " products updated")
        //     //         bamazonHome();
        //     //     })
        //     // reciept(inquierResponse.itemSelection, inquierResponse.quantitySelection);
        // } else {
        //     console.log("this is false")
        // }


        // console.log("result: " + checkQuantity(inquierResponse.itemSelection));
        // // console.log("result " + checkQuantity(inquierResponse.itemSelection))
        // if (checkQuantity(inquierResponse.itemSelection) === true) {
        //     var updateProducts = 'UPDATE products SET product_stock = product_stock - ? WHERE product_id = ?'
        //     connection.query(updateProducts,
        //         [inquierResponse.quantitySelection, inquierResponse.itemSelection],
        //         function (err, res)
        //         // if (checkQuantity() === true) {
        //         {
        //             if (err) throw err;
        //             console.log("Purchase complete!!")
        //             console.log(res.affectedRows + " products updated")
        //             bamazonHome();
        //         })
        //     // reciept(inquierResponse.itemSelection, inquierResponse.quantitySelection);
        // } else if (checkQuantity() === false) {
        //     console.log("you have reached the unavailable else")
        // }
    })
}

// using scope within the inquier response promise
function reciept(id, quantity) {
    var reciept = "SELECT * FROM products WHERE product_id = ?"
    connection.query(reciept,
        [inquierResponse.itemSelection],
        function (err, res) {
            if (err) throw err;

            console.log(quantity * res[0].product_price)

            var table = new Table({
                head: ["ID", "Product Name", "Quantity", "Product Price", "Total"],
                colWidths: [5, 20, 15, 10, 10]
            })
            for (var i = 0; i < res.length; i++) {
                table.push(
                    [`${res[i].product_id}`,
                    `${res[i].product_name}`,
                    `${quantity}`,
                    `${res[i].product_price}`,
                    `${quantity * res[i].product_price}`]
                )
            }
            console.log(table.toString());
        });
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


//COMPLETE
// includes the following
// ids
// names
// prices of the products

//COMPLETE
// first it should ask them the id of the product for purchase
// second should ask how many units

// when order is placed a series of checks occur for availablity
//     if not its insufficient quantity or out of stock
//     if store has amount it fulfills order
//         updates the database and reflects quantity
//         present cost as well as to mulitply by the quantity purchased
//          to the products product sales column

// (challenge #3)
// create a new MySQL table called departments that includes
    //- department_id
    //- department_name
    //- over_head_costs (cost per department)

//check for updates in inventory listed in products column

