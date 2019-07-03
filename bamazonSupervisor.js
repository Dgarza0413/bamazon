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
        {
            type: "list",
            choices: ["view product sales by department", "create New Department"],
            name: "menu"
        }
    ]).then(function (inquierResponse) {
        // console.log(inquierResponse);
        switch (inquierResponse.menu) {
            case "view product sales by department":
                console.log("view of product sales by department selected")
                salesDepartment()
                break;
            case "create New Department":
                console.log("create New Department selected")
                newDepartment()
                break;
            default:
                console.log("good Bye")
        }
    })
}
function salesDepartment() {
    var query = "SELECT * FROM departments"
    connection.query(query,
        function (err, res) {
            if (err) throw err;
            var table = new Table({
                head: ["department ID", "department name", "department overhead", "department sales"],
                colWidths: [12, 20, 25, 20]
            })
            for (var i = 0; i < res.length; i++) {
                console.log(res[i])
                table.push(
                    [
                        `${res[i].department_id}`,
                        `${res[i].department_name}`,
                        `${res[i].department_overhead}`
                    ]
                )
            }
            console.log(table.toString())
        })
}

function newDepartment() {
    inquier.prompt([
        {
            type: "input",
            message: "create new department name",
            name: "createDepartment"
        },
        {
            type: "input",
            message: "input overhead costs",
            name: "overhead"
        }
    ]).then(function (inquierResponse) {
        console.log(inquierResponse.createDepartment)
        console.log(inquierResponse.overhead)
    })
}

// (challenge #3)
// views product sales by department
// creates new department
// view product sales by department
    // displays a summarized table in their terminal/bash window

// | department_id | department_name | over_head_costs | product_sales | total_profit |
// | ------------- | --------------- | --------------- | ------------- | ------------ |
// | 01            | Electronics     | 10000           | 20000         | 10000        |
// | 02            | Clothing        | 60000           | 100000        | 40000        |

//total profit is a column that calculates the difference between over_head_costs and product_sales.
//total_profit should not be stored in any database by calculated.

// * Hint: You may need to look into aliases in MySQL.

// * Hint: You may need to look into GROUP BYs.

// * Hint: You may need to look into JOINS.

// * **HINT**: There may be an NPM package that can log the table to the console. What's is it? Good question :)