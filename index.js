// Required NPM Packages
const util = require("util");
const inquirer = require("inquirer");
const mysql = require("mysql2");

// Connects the database 
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Raider#7",
    database: "employees_db"
});
connection.connect(function(err) {
    if (err) throw err;});
    connection.query = util.promisify(connection.query);

// First question prompted
const firstQuestion = [
    {
        name: "action",
        message: "What would you like to do?",
        type: "list",
        choices: [
            "View All Employees",
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Exit",
        ]
    }]

// Function to handle the first questions answers
function handleInitialChoice({ action }) {
    switch (action) {
        case 'View All Employees':
        viewEmployees();
        break;
        case 'Add Employee':
        addEmployee();
        break;
        case 'Update Employee Role':
        updateEmployeeRole();
        break;
        case 'View All Roles':
        viewAllRoles();
        break;
        case 'Add Role':
        addRole();
        break;
        case 'View All Departments':
        viewDepartments();
        break;
        case 'Exit':
        process.exit(0);
        }
}

const employeeRoles = [];
const employeeChoices = [];
const departmentChoices = [];

// Views Employees in database
async function viewEmployees() {
    connection.query(
        "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.id, department.id FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id", 
        function(err, data) {
            if (err) throw err;
            console.table(data);
            init()
})}

// Looks up all roles
async function lookupRole(){  
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            employeeRoles.push(data[i].id + "-" + data[i].title)
        }
    })
}

// Looks up all employees
async function lookupEmployees(){  
    return new Promise(resolve => {
   connection.query("SELECT * FROM employee", function (err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) {
            employeeChoices.push(data[i].id + "-" + data[i].first_name+" "+ data[i].last_name)
        }
        resolve (employeeChoices)
    })})
}

// Looks up all departments
async function lookupDepts(){
connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    for (i = 0; i < data.length; i++) {
        departmentChoices.push(data[i].id + "-" + data[i].name)
    }
})
}

// Adds Employees to database
async function addEmployee() {
    lookupRole()
    lookupEmployees()
    inquirer.prompt ([
        {
            message: "What's the employee's first name?",
            type: "input",
            name: "firstName"
        },
        {
            message: "What's the employee's last name?",
            type: "input",
            name: "lastName"
        },
        {
            message: "What's the employee's role?",
            type: "list",
            choices: employeeRoles,
            name: "roleName"
        },
        {
            message: "Who's the employee's manager?",
            type: "list",
            choices: employeeChoices,
            name: "managerName"
        }
]).then(function(answer) {
    connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', ${answer.roleName[0]}, ${answer.managerName[0]});`, (err, res) => {
        if (err) throw err;
        console.log("Employee added: " + answer.firstName + " " + answer.lastName);
        init()
})});}

// Updates the employees role
async function updateEmployeeRole() {
    await lookupEmployees()
    await lookupRole()
    inquirer.prompt ([
        {
            message: "Which employee's role would you like to update?",
            type: "list",
            choices: employeeChoices,
            name: "employeeName"
        },
        {
            message: "Which role do you want to assign the selected employee?",
            type: "list",
            choices: employeeRoles,
            name:"newRole"
        }
]) .then(function(answer) {
    connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.newRole[0], answer.employeeName],function(err, res) {
        if (err) throw err;
        console.log(`${answer.employeeName.split('1,-')}s role has been changed to ${answer.newRole}`);
        init()
})});}

// Views all employees roles
async function viewAllRoles() {
    connection.query(
        "SELECT role.title, role.salary, role.department_id, department.name FROM role LEFT JOIN department on role.department_id = department.id",
        function(err, result) {
            if (err) throw err;
            console.table(result);
            init();
        }
        );
}

// Adds a role
async function addRole() {
    lookupDepts()
    inquirer.prompt ([
        {
            message: "What's the name of the role?",
            type: "input",
            name: "addRole"
        },
        {
            message: "What's the salary of the role?",
            type: "input",
            name: "salary"
        },
        {
            message: "Which department does the role belong to?",
            type: "list",
            choices: departmentChoices,
            name: "departmentName"
        }
]).then(function(answer) {
    connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.addRole}', '${answer.salary}', '${answer.departmentName[0].split('-')}');`, function(err, res) {
        if (err) throw err;
        console.log(`You have added ${answer.addRole} to Employee Roles`);
        init();
    });
});}

// Views Departments
async function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, result) {
        if (err) throw err;
        console.table(result);
        init();
    }
);}

// Initialize app function
async function init() {
    inquirer.prompt(firstQuestion)
    .then(handleInitialChoice)
}

// Start the app
init()