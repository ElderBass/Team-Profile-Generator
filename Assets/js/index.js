/*have prompts for employee input
//capture these data and place them into an HTML document
    //from scratch? have an index.html template?
//email for employee has to actually open an email window
//GitHub for employee makes a link to their profile


//Start with:
//On running app --> ask for team manager’s name, employee ID, email address, and office number
    //once this has been passed in --> asks user if they want to add employees
    //'with a menu with the option to add an engineer or an intern or to finish building my team'
        --use the inquirer with options/choices for Engineer, Intern, or Finish
    If engineer -->  engineer’s name, ID, email, and GitHub username
        -->taken back to menu after input
    If intern --> intern’s name, ID, email, and school
        --> taken back to menu after input
    If Finish --> writeFile('index.html', userData)
    */

const inquirer = require("inquirer");
const fs = require('fs');
const team = require('../../Develop/src/page-template.js')
const classes = require('../Develop/lib/classes.js');
const { Employee, Manager } = require("../../Develop/lib/classes.js");

const init = () => {
    //need to start by making a new Employee who's the manager
    // let manager = new Manager(Manager.getName,);


}