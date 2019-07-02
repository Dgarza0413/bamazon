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
    bamazonSupervisor();
});

function bamazonSupervisor() {
    inquier.prompt([

    ])
}

// (challenge #3)
// views product sales by department
// creates new department
// view product sales by department
    // displays a summarized table in their terminal/bash window

//     | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

//total profit is a column that calculates the difference between over_head_costs and product_sales.
//total_profit should not be stored in any database by calculated.

// * Hint: You may need to look into aliases in MySQL.

// * Hint: You may need to look into GROUP BYs.

// * Hint: You may need to look into JOINS.

// * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)