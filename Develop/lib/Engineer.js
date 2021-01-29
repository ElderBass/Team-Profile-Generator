const inquirer = require("inquirer");
const Employee = require('./Employee.js')


class Engineer extends Employee {
    constructor(gitHub = "") {
        super(this.getName, this.getId, this.getEmail);
        this.git = gitHub;
    }

    getGitHub() {
        inquirer
            .prompt({
                type: 'input',
                message: "Please enter engineer's GitHub username:",
                name: 'git'
            })
            .then(response => {
                this.git = response.git;
                return response.git;
            })
    }
    getRole() {
        return 'Engineer'
    }
}

module.exports = Engineer;