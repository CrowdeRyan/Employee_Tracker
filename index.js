// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const figlet = require("figlet");

// Secure connection
const sequelize = require("connection");

// Variables
let roles;
let departments;
let managers;
let employees;

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: process.env.DB_USER,

  // Your password
  password: process.env.DB_PASSWORD,
  database: "employees_db",
});

// Connect functions
connection.connect(function (err) {
  if (err) throw err;
  start();
  getDepartments();
  getRoles();
  getManagers();
  getEmployees();
});

// Intiating prompts
start = () => {
  inquirer
    .prompt({
      name: "choices",
      type: "list",
      message: "What would you like to do?",
      choices: ["ADD", "VIEW", "UPDATE", "DELETE", "EXIT"],
    })
    .then(function (answer) {
      if (answer.choices === "ADD") {
        addSomething();
      } else if (answer.choices === "VIEW") {
        viewSomething();
      } else if (answer.choices === "UPDATE") {
        updateSomething();
      } else if (answer.choices === "DELETE") {
        deleteSomething();
      } else if (answer.choices === "EXIT") {
        figlet("Thanks for using FSC Employee Tracker", (err, result) => {
          console.log(err || result);
        });

        connection.end();
      } else {
        connection.end();
      }
    });
};

// Roles selection
getRoles = () => {
  connection.query("SELECT id, title FROM role", (err, res) => {
    if (err) throw err;
    roles = res;
  });
};

// Department selection
getDepartments = () => {
  connection.query("SELECT id, name FROM department", (err, res) => {
    if (err) throw err;
    departments = res;
  });
};

// Manager selection
getManagers = () => {
  connection.query(
    "SELECT id, first_name, last_name, CONCAT_WS(' ', first_name, last_name) AS managers FROM employee",
    (err, res) => {
      if (err) throw err;
      managers = res;
    }
  );
};

// Employee Selection
getEmployees = () => {
  connection.query(
    "SELECT id, CONCAT_WS(' ', first_name, last_name) AS Employee_Name FROM employee",
    (err, res) => {
      if (err) throw err;
      employees = res;
      // console.table(employees);
    }
  );
};

// Menu for adding with content, with figlet display closer
addSomething = () => {
  inquirer
    .prompt([
      {
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: ["DEPARTMENT", "ROLE", "EMPLOYEE", "EXIT"],
      },
    ])
    .then(function (answer) {
      if (answer.add === "DEPARTMENT") {
        console.log("Add a new: " + answer.add);
        addDepartment();
      } else if (answer.add === "ROLE") {
        console.log("Add a new: " + answer.add);
        addRole();
      } else if (answer.add === "EMPLOYEE") {
        console.log("Add a new: " + answer.add);
        addEmployee();
      } else if (answer.add === "EXIT") {
        figlet("Thanks for using FSC Employee Tracker", (err, result) => {
          console.log(err || result);
        });

        connection.end();
      } else {
        connection.end();
      }
    });
};

// Department section of adding menu
addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What department would you like to add?",
      },
    ])
    .then(function (answer) {
      connection.query(
        `INSERT INTO department (name) VALUES ('${answer.department}')`,
        (err, res) => {
          if (err) throw err;
          console.log("1 new department added: " + answer.department);
          getDepartments();
          start();
        }
      );
    });
};

// Role section of adding menu
addRole = () => {
  let departmentOptions = [];
  for (i = 0; i < departments.length; i++) {
    departmentOptions.push(Object(departments[i]));
  }

  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What role would you like to add?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this possition?",
      },
      {
        name: "department_id",
        type: "list",
        message: "What is the department for this possition?",
        choices: departmentOptions,
      },
    ])
    .then(function (answer) {
      for (i = 0; i < departmentOptions.length; i++) {
        if (departmentOptions[i].name === answer.department_id) {
          department_id = departmentOptions[i].id;
        }
      }
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', ${department_id})`,
        (err, res) => {
          if (err) throw err;

          console.log("1 new role added: " + answer.title);
          getRoles();
          start();
        }
      );
    });
};
