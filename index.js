// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const { printTable } = require("console-table-printer");
const figlet = require("figlet");

// Variables
let roles;
let departments;
let managers;
let employees;
