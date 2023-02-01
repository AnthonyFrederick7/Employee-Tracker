const connection = require("./js/connection");
const inquirer = require("inquirer");

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
    }];

// Start the app
init();

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
        default:
        }}

function viewEmployees()

function addEmployee() {
    let roles = connection.query(
'SELECT * FROM role')

    let employeesManager = connection.query(

    )

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
            options: [roles],
            name: "roleName"
        },
        {
            message: "Who's the employee's manager?",
            type: "list",
            options: [employeesManager],
            name: "ManagerName"
        }
]).then(function(answer) {
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.firstName, answer.lastName, answer.roleName, answer.managerName], function(err, res) {
      if (err) throw err;
      console.table(res);
    });
    init();
});}

function updateEmployeeRole() {
    inquirer.prompt ([
        {
            message: "Which employee's role would you like to update?",
            type: "list",
            name: ""
        },
        {
            message: "Which role do you want to assign the selected employee?",
            type: "list",
            name:""
        }
])}

function viewAllRoles()

function addRole() {
    inquirer.prompt ([
        {
            message: "What is the name of the role?",
            type: "input",
            name: "managerName"
        },
        {
            message: "What is the salary of the role?",
            type: "input",
            name: ""
        },
        {
            message: "Which department does the role belong to?",
            type: "list",
            name: ""
        }
])}

function viewDepartments()

function init() {
    inquirer.prompt(firstQuestion)
    .then(handleInitialChoice)
}
