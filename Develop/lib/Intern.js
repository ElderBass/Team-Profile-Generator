const inquirer = require("inquirer");
const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(school) {
        super(this.getName, this.getId, this.getEmail);
        this.school = school;

    }

    getSchool() {
        inquirer
            .prompt({
                type: 'input',
                message: "Please enter intern's current school:",
                name: 'school'
            })
            .then(response => {
                this.school = response.school;
                return response.school;
            })
    }
    getRole() {
        return 'Intern'
    }
}


module.exports = Intern;