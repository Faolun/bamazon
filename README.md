# bamazon
Amazon-like storefront using MySQL and Node


REQUIREMENTS (All are listed in the package.json)
    mysql
    inquirer
    cli-table
    colors

FILES
    bamazon.sql | an SQL schema and seed file.
    bamazonCustomer.js | customer level database access
    bamazonManager.js | manager level database access
    bamazonSupervisor.js | supervisor level database access

GOALS
    Welcome to bAmazon. The goal of this program is to provide a simple and clean Amazon like node app that can be run at three levels: customers, managers and supervisors

    Customer Level
        Can view inventory and order so long as there is quantity. If not, they will be alerted to the lack of said inventory. All purchaces are recorded in the database.

    Manager Level
        Can view overall inventory as well as lower inventory items (less than five in stock). Managers can make changes to inventory quantities and add new products.

    Supervisor Level
        Supervisors can look into the seperate "departments" database to view overall product department performance and add new departments.

