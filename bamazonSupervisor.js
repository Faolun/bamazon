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
console.log(colors.bgBlue.white(`${splitter}\n`));
console.log(colors.red.bold(`****************** [SUPERVISOR LEVEL ACCESS] *****************\n`));

function supervisor(){
  inquirer.prompt([{
    type: "list",
    name: "select",
    message: "Supervisor Level Functions Menu",
    choices: ["View Product Sales by Department", "Create New Department", "End Session"]
  }]).then(function(ans){
    switch(ans.select){
      case "View Product Sales by Department": viewProductSalesByDept();
      break;
      case "Create New Department": createNewDept();
      break;
      case "End Session": console.log(colors.red('Session Ended. Logging Out.'));
      connection.end();
    }
  });
}

function viewProductSalesByDept(){
    console.log(colors.red.bold(`\n**************** [Product Sales By Department] ***************\n`));
  connection.query('SELECT * FROM departments', function(err, res){
    if(err) throw err;
    var table = new Table({
        head: ["Department ID", "Department Name", "Overhead Cost", "Product Sales", "Total Profit"]
      });
      for (let i = 0; i < res.length; i++) {
        table.push([res[i].depId, res[i].department_name, res[i].overHeadCosts, res[i].totalSales, ((res[i].totalSales - res[i].overHeadCosts).toFixed(2))]);
      }
      console.log(table.toString());
      console.log(`${splitter}\n`);
  supervisor();
  });
}
  //create a new department
  function createNewDept(){
    console.log(colors.red.bold(`\n****************** [Creating New Department] *****************\n`));

    inquirer.prompt([
    {
      type: "input",
      name: "deptName",
      message: "Department Name: "
    }, {
      type: "input",
      name: "overHeadCost",
      message: "Department Over Head Cost: ",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }, {
      type: "input",
      name: "prodSales",
      message: "Current Product Sales: ",
      default: 0,
      validate: function(val){
        if(isNaN(val) === false){return true;}
        else{return false;}
      }
    }
    ]).then(function(ans){
      connection.query('INSERT INTO Departments SET ?',{
        department_name: ans.deptName,
        overHeadCosts: ans.overHeadCost,
        totalSales: ans.prodSales
      }, function(err, res){
        if(err) throw err;
        console.log(colors.red(splitter));
        console.log(colors.red(`                        Department Added`));
        console.log(colors.red(splitter));
        supervisor();
    })
     });
  }

supervisor();