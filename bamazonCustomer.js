var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");

var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "root",
  database: "bamazon"
});

var splitter = `***************************************************************`

console.log(colors.bgBlue.white(`\n************************** [bAmazon] **************************`));
console.log(colors.bgBlue.white(`       Thanks for scrying the wizard's marketplace.            `));
console.log(colors.bgBlue.white(`       The only source for all your adventuring needs.         `));
console.log(colors.bgBlue.white(splitter));

function displayGoods() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    var table = new Table({
      head: ["ID", "Item Name", "Department Name", "Cost", "Stock Qty"]
    });

    for (let i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].department_name, (res[i].price).toFixed(2), res[i].stock_quantity]);
    }

    console.log(table.toString());
    console.log(`${splitter}\n`);

    inquirer.prompt([{
      name: "itemId",
      type: "input",
      message: "What ID number you would like to buy?",
      validate: function (value) {
        if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {
          return true;
        } else {
          return false;
        }
      }
    }, {
      name: "Quantity",
      type: "input",
      message: "How many will you be requiring?",
      validate: function (value) {
        if (isNaN(value) == false) {
          return true;
        } else {
          return false;
        }
      }
    }]).then(function (answer) {
      var chosenId = answer.itemId - 1;
      var chosenQty = parseInt(answer.Quantity);
      var orderTotal = parseFloat(res[chosenId].price.toFixed(2) * chosenQty).toFixed(2);
      if (chosenQty <= res[chosenId].stock_quantity) {
        console.log(`Your total for (${answer.Quantity}) : ${res[chosenId].product_name} is: $${orderTotal}`);
        inquirer.prompt([{
          name: "reply",
          type: "confirm",
          message: "Are you satisfied with your purchace?"
        }]).then(function (answer) {
          if (answer.reply) {
            connection.query("UPDATE products SET ? WHERE ?", [{
              stock_quantity: res[chosenId].stock_quantity - chosenQty
            }, {
              id: res[chosenId].id
            }], function (err, res) {
              console.log(`\n${splitter}`);
              console.log(`               A most wise purchace. Thank you.`);
              console.log(`         Your order will arrive by courier within 3 days.`);
              console.log(`${splitter}\n`);

            });

            connection.query("SELECT * FROM departments", function(err, deptRes){
              if(err) throw err;
              var index;
              for(var i = 0; i < deptRes.length; i++){
                if(deptRes[i].department_name === res[chosenId].department_name){
                  index = i;
                }
              }
              connection.query("UPDATE departments SET ? WHERE ?", [
              {totalSales: deptRes[index].totalSales + orderTotal},
              {department_name: res[chosenId].department_name}
              ], function(err, deptRes){
                  if(err) throw err;
                  followUp();
              });
            });
          } else {
            console.log("As you wish...")
            followUp();
          }
        });
      } else {
        console.log(colors.red(splitter));
        console.log(colors.red(`\nWe show an insufficient quanity of ${res[chosenId].product_name} at this time.\nWe count ${res[chosenId].stock_quantity} in our inventory.\n`));
        console.log(colors.red(splitter));
        followUp();
      }
    })
  })
}

function followUp() {
  inquirer.prompt([{
    name: "reply",
    type: "confirm",
    message: "Would you like to browse more wares?"
  }]).then(function (answer) {
    if (answer.reply) {
      displayGoods();
    } else {
      console.log(colors.magenta(splitter));
      console.log(colors.magenta(`\n                    Until we meet again!\n`));
      console.log(colors.magenta(splitter));
      connection.end();
    }
  });
};

displayGoods();
