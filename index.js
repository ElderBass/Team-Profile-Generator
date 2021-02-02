//all the imports we'll need to run this application 
const inquirer = require("inquirer");
const fs = require('fs');
const team = require('./src/page-template.js');
const Employee = require("./lib/Employee.js"); //not sure we actually need this one but since all the other employees depend on it, it felt wrong not to include it lol
const Manager = require("./lib/Manager.js");
const Intern = require("./lib/Intern.js");
const Engineer = require("./lib/Engineer.js");

//made an array of the standard questions common to all employee types
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

//we will push every employee we enter into this array, to be used as an argument for the 'generateTeam' function
const employees = [];

//function for creating the manager of the team
const createManager = () => {
    //we'll ask all the general questions first, then the question unique to the manager
    inquirer
        .prompt(
            [...employeeQuestions, //spread operator for the stand employee questions
                {
                    type: "input",
                    message: "What is the manager's office number?",
                    name: 'officeNumber'
                }
            ])
        .then(response => {
            //take our responses and use them to create a new Manager class, constructed by the user input
            //use 'let' here instead of const because we might add multiple unique managers so we don't want to overwrite them
            let manager = new Manager(response.name, response.id, response.email, response.officeNumber);

            //push this new manager class into the employees array
            employees.push(manager);
            //run this function, which basically asks the user if they want to keep adding employees
            continueAddingEmployees();
        })
}

//this is nearly identical to the createManager function so I won't elaborate much here
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

//again, identical code here
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

//function to ask user if they want to keep adding employees or finish application and generate their team's page
const continueAddingEmployees = () => {
    inquirer
        .prompt({
            type: 'confirm',
            message: 'Would you like to continue adding employees?',
            name: 'continue'
        })
        .then(response => {
            if (response.continue === true) {
                //if they say yes, then we run the createEmployee function
                createEmployee();
            }
            if (response.continue === false) {
                //if they want to stop creating employees, we run our 'init' function which will give them the option of finishing the document
                init();
            }
        })
}

//function to create a new employee, the type of which will be chosen by the user
const createEmployee = () => {

    inquirer
        .prompt({ //ask user what type of employee they want to add. left in manager in case there are multiple managers on a project
            type: 'list',
            message: "What type of employee would like to add?",
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'employee'
        }).then(response => {

            //based on what the user chooses, we run the respective function for that employee type
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

//function to be run on application start
const init = () => {
    //if we don't have any employees added to our array yet (which is obviously a guarantee on app start), we run this 'intro' prompt and force user to create a manager
    if (employees.length === 0) {
        inquirer
            .prompt({
                type: "list",
                message: 'Welcome to Dream Team Supreme, the go-to app for team profile generation! Please start by entering the manager of your team.',
                name: 'start',
                choices: ['Continue'] //don't give the user a choice in the matter lol
            })
            .then(answer => {
                //once they hit continue, we go straight to the createManager function to start with that critical position
                if (answer.start === 'Continue') {
                    createManager();
                }
            })
    }
    //if we have employees added into our array, we want to skip that intro stuff above and see if the user wants to add more employees or finish creating document
    else {
        inquirer
            .prompt({
                type: 'list',
                message: "What would you like to do?",
                choices: ['Add Employee', 'Finish Document'],
                name: 'start'
            })
            .then(response => {
                //if they do want to keep adding employees, run employee function
                if (response.start === 'Add Employee') {
                    createEmployee();
                }
                //if they select finish document, we want to generate their team's HTML and write it into a new file
                if (response.start === 'Finish Document') {
                    //start with this prompt which will ask for the project or team's name, which will be the new folder's name in dist that holds the new html file
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

//run init, which will get us everywhere we need to go :)
init();