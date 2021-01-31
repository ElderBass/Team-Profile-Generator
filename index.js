//all the imports we'll need to run this application 
const inquirer = require("inquirer");
const fs = require('fs');
const team = require('./src/page-template.js');
const Manager = require("./lib/Manager.js");
const Employee = require("./lib/Employee.js");
const Intern = require("./lib/Intern.js");
const Engineer = require("./lib/Engineer.js");


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


const employees = [];

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
            message: "What type of employee would like to add?",
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'employee'
        }).then(response => {
            if (response.employee === 'Manager') {

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

//function to render our CSS styling, which will be written as a new file once the team is generated
const generateCSS = () => {
    return `
    * {
        font-family: 'Ubuntu';
        box-sizing: border-box;
    }
    
    .team-heading {
        background-color: rgb(78, 4, 78);
        color: white;
    }
    
    .team-area {
        gap: 20px;
        margin-bottom: 40px;
    }
    
    .employee-card {
        box-shadow: 10px 10px 10px rgb(78, 4, 78);
        margin-top: 15px;
    }
    
    .card-header {
        color: white;
        background-color: rgb(49, 36, 129);
    }
    
    .card-body {
        color: rgb(78, 4, 78);
    }
    `
}

const init = () => {

    if (employees.length === 0) {
        inquirer
            .prompt({
                type: "list",
                message: 'Welcome to Dream Team Supreme! Please start by entering the manager of your team.',
                name: 'start',
                choices: ['Continue']
            })
            .then(answer => {
                if (answer.start === 'Continue') {
                    createManager();
                }
            })
    } else {
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
                    inquirer.prompt({
                            type: 'input',
                            message: 'What is the name of your project and/or team?',
                            name: 'team'
                        })
                        .then(answer => {
                            //create a new folder, whose name is derived from above prompt, that will contain the html and css files generated
                            fs.mkdirSync(__dirname + "/dist/" + `${answer.team}/`);

                            //create our new html file inside the folder chain we just created above
                            fs.writeFileSync(__dirname + "/dist/" + `${answer.team}/` + "index.html", team(employees), (err) =>
                                    err ? console.error(err) : console.log('Success!'))
                                //add our style.css file to the folder alongside the html so the generated html will look extra nice
                            fs.writeFileSync(__dirname + "/dist/" + `${answer.team}/` + "style.css", generateCSS(), (err) =>
                                err ? console.error(err) : console.log('Success!'))
                        })

                }
            })
    }
}


init();