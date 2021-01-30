const inquirer = require("inquirer");
const fs = require('fs');
const team = require('./Develop/src/page-template.js');
const Manager = require("./Develop/lib/Manager.js");
const Employee = require("./Develop/lib/Employee.js");
const Intern = require("./Develop/lib/Intern.js");
const Engineer = require("./Develop/lib/Engineer.js");



//questions for employee 
// .then >> create Employee object
//type of employee :
// if manager >> create Manager Object
// else intern >> create Intern Object
//write file with objects you created.

const employeeQuestions = [{
        type: 'input',
        message: "Please enter employee's name:",
        name: 'name'
    },
    {
        type: 'input',
        message: "Please enter employee's id number:",
        name: 'id'
    },
    {
        type: 'input',
        message: "Please enter employee's email address:",
        name: 'email'
    }
]


const employees = []

const createManager = () => {
    inquirer
        .prompt(
            [...employeeQuestions,
                {
                    type: "input",
                    message: "What is the manager's office number?",
                    name: 'officeNumber'
                }
            ])
        .then(response => {
            let manager = new Manager(response.name, response.id, response.email, response.officeNumber);
            //console.log(`~Employee Data~ \n Name: ${manager.name}  \n ID: ${manager.id}  \n Email: ${manager.email} \n Office Number: ${manager.officeNumber}`)
            employees.push(manager);
            continueAddingEmployees();
        })
}

const createEngineer = () => {
    inquirer
        .prompt(
            [...employeeQuestions,
                {
                    type: 'input',
                    message: "Please enter engineer's GitHub username:",
                    name: 'github'
                }
            ]
        )
        .then(responseThree => {
            let engineer = new Engineer(responseThree.name, responseThree.id, responseThree.email, responseThree.github);

            employees.push(engineer);

            continueAddingEmployees();
        })
}

const createIntern = () => {
    inquirer
        .prompt(
            [...employeeQuestions,
                {
                    type: 'input',
                    message: "Please enter intern's current school:",
                    name: 'school'
                }
            ]
        )
        .then(responseFour => {
            let intern = new Intern(responseFour.name, responseFour.id, responseFour.email, responseFour.school);

            employees.push(intern);
            continueAddingEmployees();
        })
}

const continueAddingEmployees = () => {
    inquirer
        .prompt({
            type: 'confirm',
            message: 'Would you like to continue adding employees?',
            name: 'continue'
        })
        .then(response => {
            if (response.continue === true) {
                createEmployee();
            }
            if (response.continue === false) {
                init();
            }
        })
}

const createEmployee = () => {
    //need to start by making a new Employee who's the manager
    //ask what type of employee to add --> create new employee --> prompts for employee    
    inquirer
        .prompt({
            type: 'list',
            message: "What type of employee would like to add? (Please start with Manager if you haven't added one already)",
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'employee'
        }).then(response => {
            if (response.employee === 'Manager') {
                //do manager stuff
                createManager();
            }
            if (response.employee === 'Engineer') {
                createEngineer();
            }
            if (response.employee === 'Intern') {
                createIntern();

            }
        })
}

const init = () => {

    inquirer
        .prompt({
            type: 'list',
            message: "What would you like to do?",
            choices: ['Add Employee', 'Finish Document'],
            name: 'start'
        })
        .then(response => {

            if (response.start === 'Add Employee') {
                createEmployee();
            }
            if (response.start === 'Finish Document') {

                fs.writeFile('index.html', team(employees), (err) =>
                    err ? console.error(err) : console.log('Success!'))
            }
        })
}

init();