//import Employee class so we can extend it
const Employee = require('./Employee.js')


class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        //super will use the Employee class to construct this new class with these arguments
        super(name, id, email);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber = () => this.officeNumber;

    getRole = () => 'Manager';
}

module.exports = Manager;