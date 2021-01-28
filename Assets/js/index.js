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


const manager = [{
        type: 'input',
        message: 'What is your name?',
        name: 'name'
    },
    {
        type: 'input',
        message: 'What is your employee ID?',
        name: 'id'
    },
    {
        type: 'input',
        message: 'What is your email address?',
        name: 'email'
    },
    {
        type: 'input',
        message: 'What is your office phone number?',
        name: 'office'
    },
];
const engineer = [{
        type: 'input',
        message: "What is the engineer's name?",
        name: 'name'
    },
    {
        type: 'input',
        message: "What is the engineer's employee ID?",
        name: 'id'
    },
    {
        type: 'input',
        message: "What is the engineer's email address?",
        name: 'email'
    },
    {
        type: 'input',
        message: "What is the engineer's GitHub username?",
        name: 'git'
    },
    {
        type: 'input',
        message: "What is the engineer's name?",
        name: 'name'
    },

];
const intern = [{
        type: 'input',
        message: "What is the intern's name?",
        name: 'name'
    },
    {
        type: 'input',
        message: "What is the intern's employee ID?",
        name: 'id'
    },
    {
        type: 'input',
        message: "What is the intern's email?",
        name: 'email'
    },
    {
        type: 'input',
        message: "What school does the intern attend?",
        name: 'school'
    },
];

const managerInput = (arr) => {
    inquirer
        .prompt(arr)
        .then(response => {
            //create div with this data that will be displayed to HTML file
        })
}

const addEngineer = (arr) => {
    inquirer
        .prompt(arr)
        .then(response => {
            //create div with this data to be displayed in HTML file
            console.log(response)
        })
};
const addIntern = (arr) => {
    inquirer
        .prompt(arr)
        .then(response => {
            //create div with this data to be displayed in HTML file
            console.log(response)
        })
};

const finishFunction = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {

    })
}

const menuOptions = () => {
    inquirer
        .prompt({
            type: 'list',
            message: 'What would you like to do?',
            choices: ['Add an Engineer', 'Add an Intern', 'Finish'],
            name: 'menu'
        })
        .then((response) => {
            if (response.name === 'Add an Engineer') {
                addEngineer(engineer);
            }
            if (response.name === 'Add an Intern') {
                addIntern(intern);
            }
            if (response.name === 'Finish') {
                finishFunction()
            }

        })
}

const init = () => {
    managerInput(manager);
    menuOptions
}