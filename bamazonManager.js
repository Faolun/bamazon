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

function manager(){
  inquirer.prompt([{
    name: "select",
    type: "list",
    message: "Function Menu Selection",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product","End Session"]
  }]).then(function(ans){
     switch(ans.select){
      case "View Products for Sale": displayGoods();
      break;
      case "View Low Inventory": displayLowInv();
      break;
      case "Add to Inventory": addToInventory();
      break;
      case "Add New Product": addNewProduct();
      break;
      case "End Session": console.log('Until Next Time!'); 
      connection.end();
        
    }
  });
}

//views all inventory
function displayGoods() {
    connection.query("SELECT * FROM products", function (err, res) {
      if (err) throw err;
      console.log(splitter);
      var table = new Table({
        head: ["ID", "Item Name", "Department Name", "Cost", "Stock Qty"]
      });

      for (let i = 0; i < res.length; i++) {
        table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
      }
      console.log(table.toString());
      console.log(`${splitter}\n`);
  manager();
  });
}

//views inventory lower than 5
function displayLowInv(){

  connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function (err, res) {
    if (err) throw err;
    console.log(splitter);
    var table = new Table({
      head: ["ID", "Item Name", "Department Name", "Cost", "Stock Qty"]
    });

    for (let i = 0; i < res.length; i++) {
      table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    console.log(`************** [Viewing Low Inventory] **************`);
    console.log(table.toString());
    console.log(`${splitter}\n`);
manager();
  });
}

//displays prompt to add more of an item to the store and asks how much
function addToInventory(){
  connection.query('SELECT * FROM Products', function(err, res){
  if(err) throw err;
   var itemArray = [];
  //  console.log(res[0].product_name)
  //pushes each item into an itemArray 
  //**TODO FIND WHY THIS IS duplicating */
  for(var i=0; i<res.length; i++){
    itemArray.push(res[i].product_name);
  };
  
  console.log(`************** [Adding To Inventory] **************`);
  inquirer.prompt([{
    name: "product",
    type: "list",
    choices: itemArray,
    message: "Which item would you like to add inventory?"
  }, {
    type: "input",
    name: "qty",
    message: "How much would you like to add?",
    validate: function(value){
      if(isNaN(value) == false) {
        return true;
      }else{
        return false;}
    }
    }]).then(function(ans){
      var currentQty;
      for(var i=0; i<res.length; i++){
        if(res[i].product_name === ans.product){
          currentQty = res[i].stock_quantity;
        }
      }
      connection.query('UPDATE Products SET ? WHERE ?', [
        {stock_quantity: currentQty + parseInt(ans.qty)},
        {product_name: ans.product}
        ], function(err, res){
          if(err) throw err;
          console.log(splitter);
          console.log('The quantity was updated.');
          console.log(splitter);
          manager();
        });
      })
  });
}

//allows manager to add a completely new product to store
function addNewProduct(){
  var deptNames = [];
  connection.query('SELECT * FROM departments', function(err, res){
    if(err) throw err;
    for(var i = 0; i<res.length; i++){
      deptNames.push(res[i].department_name);
    }
  });
  console.log(`************** [Adding New Product] **************`);
inquirer.prompt([{
    name: "product",
    type: "input",
    message: "Product Name To Be Added: "
    // validate: function(value){
    //   if(isNaN(value) == false) {
    //     return true;
    //   }else{
    //     return false;}
    // }
  }, {
    name: "department",
    type: "list",
    message: "Department: ",
    choices: deptNames
  }, {
    name: "price",
    type: "input",
    message: "Price: ",
    validate: function(value){
      if(isNaN(value) == false) {
        return true;
      }else{
        return false;}
    }
  }, {
    name: "quantity",
    type: "input",
    message: "Quantity: ",
    validate: function(value){
      if(isNaN(value) == false) {
        return true;
      }else{
        return false;}
    }
  }]).then(function(ans){
    connection.query('INSERT INTO products SET ?',{
      product_name: ans.product,
      department_name: ans.department,
      price: ans.price,
      stock_quantity: ans.quantity
    }, function(err, res){
      if(err) throw err;
      console.log(splitter);
      console.log('Another item was added to the store.');
      console.log(splitter);
      manager();
    })
   
  });
  ;
}

manager();