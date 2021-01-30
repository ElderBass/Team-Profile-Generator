const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(name = "", id = 0, email = "", school = "") {
        super(name, id, email);
        this.school = school;

    }

    getSchool = () => this.school;

    getRole = () => 'Intern';
}


module.exports = Intern;