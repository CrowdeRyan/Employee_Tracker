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
