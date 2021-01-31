//import Employee class so we can extend it
const Employee = require('./Employee.js')


class Engineer extends Employee {
    constructor(name, id, email, github) {
        //super will use the Employee class to construct this new class with these arguments
        super(name, id, email);
        this.github = github;
    }

    getGithub = () => this.github;

    getRole = () => 'Engineer';
}

module.exports = Engineer;