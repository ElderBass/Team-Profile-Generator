const inquirer = require("inquirer");


class Employee {
    constructor(name = "", id = 0, email = "") {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        inquirer
            .prompt({
                type: 'input',
                message: "Please enter employee's name:",
                name: 'name'
            })
            .then(response => {
                this.name = response.name;
                return response.name;
            })
    }

    getId() {
        inquirer
            .prompt({
                type: 'input',
                message: "Please enter employee's id number:",
                name: 'id'
            })
            .then(response => {
                this.id = response.id;
                return response.id;
            })
    }

    getEmail() {
        inquirer
            .prompt({
                type: 'input',
                message: "Please enter employee's email address:",
                name: 'email'
            })
            .then(response => {
                this.email = response.email;
                return response.email;
            })
    }
    getRole() {
        return 'Employee'
    }
}

module.exports = Employee;