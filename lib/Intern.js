//import Employee class so we can extend it
const Employee = require('./Employee.js');

class Intern extends Employee {
    constructor(name, id, email, school) {
        //super will use the Employee class to construct this new class with these arguments
        super(name, id, email);
        this.school = school;

    }

    getSchool = () => this.school;

    getRole = () => 'Intern';
}


module.exports = Intern;