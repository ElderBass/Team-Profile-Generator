const inquirer = require("inquirer");
const Employee = require('./Employee.js')


class Manager extends Employee {
    constructor(office = 0) {
        super(this.getName, this.getId, this.getEmail);
        this.office = office;
    }

    getOfficeNumber() {
            inquirer
                .prompt({
                    type: 'input',
                    message: "Please enter manager's office number:",
                    name: 'office'
                })
                .then(response => {
                    this.office = response.office;
                    return response.office;
                })
        }
        //getOfficeNumber()
    getRole() {
        return 'Manager'
    }
}

module.exports = Manager;