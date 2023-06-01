const inquirer = require('inquirer');
const db = require('./config/connection')

//View all employees
const viewAllEmployees = () => {
    const employeeQuery = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee LEFT JOIN roles on employee.roles_id = roles.id 
    LEFT JOIN department on roles.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id`

    //Query the database to get employee data
    db.promise().query(employeeQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//View all roles
const viewAllRoles = () => {
    const roleQuery = `SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id`

    //Query the database to get roles data
    db.promise().query(roleQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//View all departments
const viewAllDepartments = () => {
    const departmentQuery = `SELECT * FROM department`

    //Query the database to get department data
    db.promise().query(departmentQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//View employee by manager
const viewEmployeeByManager = () => {
    const employManagerQuery = `SELECT COUNT(employee.id) AS number_employees, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id GROUP BY manager`

    //Query the database to get employee count by manager
    db.promise().query(employManagerQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//Add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department',
            name: 'nameOfDepartment'
        }
    ])
        .then((answer) => {

            //Insert department into the database
            db.promise().query(`INSERT INTO department (name) VALUES('${answer.nameOfDepartment}')`)
                .then(() => {

                    console.log(` '${answer.nameOfDepartment}' added to the department`)
                    mainPrompt()
                })
                .catch((err) => {
                    console.log(err)
                    db.end()
                })
        })
}

//Add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role',
            name: 'nameOfRole'
        },
        {
            type: 'input',
            message: 'What is the salary of the role',
            name: 'salary'
        },
        {
            type: 'list',
            message: 'Which department does the role belong to',
            name: 'roleDepartment',
            choices: [
                'Data Administration',
                'Software Development',
                'Accounting and Finance',
                'Marketing and Outreach',
                'Human Resource Administration'
            ]
        }
    ])
        .then((answer) => {

            //Insert a role into the database
            db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answer.nameOfRole}', '${answer.salary}', (SELECT id FROM department WHERE name = '${answer.roleDepartment}'))`)
                .then(() => {

                    console.log(` '${answer.nameOfRole}' added to the role`)
                    mainPrompt()
                })
                .catch((err) => {
                    console.log(err)
                    db.end()
                })
        })
}

//Add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee first name?',
            name: 'employeeFirstName'
        },
        {
            type: 'input',
            message: 'What is the employee last name?',
            name: 'employeeLastName'
        },
        {
            type: 'list',
            message: 'What is the employee role?',
            name: 'employeeRole',
            choices: [
                'Data Scientist',
                'Senior Software Engineer',
                'Finance Specialist',
                'Lead Accountant',
                'Junior Web Developer',
                'Sales Manager',
                'Talent Recruiter',
                'Customer Representative',
                'Data analyist',
                'Project Manager'
            ]
        },
        {
            type: 'list',
            message: "Who is the employee's manager?",
            name: 'managerName',
            choices: [
                'Tom Turner',
                'John Sean',
                'Ashley Handerson',
                'Anu Bora',
                'Jackson Chris',
                'Bakam Peter',
                'Thony Jim',
                'Harmony Cole'
            ]
        },
    ])
        .then((answer) => {
            const addEmployeeQuery = `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
        VALUES (
          '${answer.employeeFirstName}',
          '${answer.employeeLastName}',
          (SELECT id FROM roles WHERE title = '${answer.employeeRole}'),
          (SELECT holder.id FROM (SELECT id FROM employee WHERE CONCAT(first_name, ' ', last_name) = '${answer.managerName}') AS holder)
        )`

            //Insert an employee into the database
            db.promise().query(addEmployeeQuery)
                .then(() => {

                    console.log(`${answer.employeeFirstName}` + " " + `${answer.employeeLastName}` + " " + 'added to the employee list.')
                    mainPrompt()
                })
                .catch((err) => {
                    console.log(err)
                    db.end()
                })
        })

}

//Update role
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee role do you want to update?',
            name: 'updateEmployeeName',
            choices: [
                'Tom Turner',
                'John Sean',
                'Ashley Handerson',
                'Anu Bora',
                'Jackson Chris',
                'Bakam Peter',
                'Thony Jim',
                'Harmony Cole'
            ]
        },
        {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            name: 'newRole',
            choices: [
                'Data Scientist',
                'Senior Software Engineer',
                'Finance Specialist',
                'Lead Accountant',
                'Junior Web Developer',
                'Sales Manager',
                'Talent Recruiter',
                'Customer Representative',
                'Data analyist',
                'Project Manager'
            ]
        }
    ])
        .then((answer) => {
            const updateRoleQuery = `UPDATE employee 
    SET roles_id = (SELECT id FROM roles WHERE title = '${answer.newRole}') 
    WHERE CONCAT(first_name, ' ', last_name) = '${answer.updateEmployeeName}'`

            // Update role in the database
            db.promise().query(updateRoleQuery)
                .then(() => {

                    console.log(` Updated employee's role`)
                    mainPrompt()
                })
                .catch((err) => {
                    console.log(err)
                    db.end()
                })
        })

}

// Delete an employee
const deleteEmployees = () => {
    inquirer.prompt(
        {
            type: 'input',
            message: "What is the employee's id?",
            name: 'employeeId',

        })
        .then((answer) => {
            const deleteEmployeeQuery = `DELETE FROM employee WHERE id = '${answer.employeeId}'`

            const selectEmployeeQuery = `SELECT CONCAT(employee.first_name, " ", employee.last_name) AS name FROM employee WHERE employee.id = '${answer.employeeId}'`;

            // Delete employee from the database
            db.promise().query(deleteEmployeeQuery)

                .then(() => {
                    db.promise().query(selectEmployeeQuery)
                        .then((result) => {
                            if (result[0].name) {
                                console.log(`${result[0].name}  deleted from the list.`)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            db.end()
                        })
                    mainPrompt()
                })
                .catch((err) => {
                    console.log(err)
                    db.end()
                })
        })
}

//Display the main prompt
function mainPrompt() {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'view',
            choices: [
                'View all employees',
                'View all roles',
                'View all departments',
                'View employee by manager',
                'Add departments',
                'Add roles',
                'Add employees',
                'Update employee roles',
                'Delete employees',
            ]
        }

    ])
        .then((answer) => {
            //
            if (answer.view === 'View all employees') {
                viewAllEmployees()
            } else if (answer.view === 'View all roles') {
                viewAllRoles()
            } else if (answer.view === 'View all departments') {
                viewAllDepartments()
            } else if (answer.view === 'View employee by manager') {
                viewEmployeeByManager()
            } else if (answer.view === 'Add roles') {
                addRole()
            } else if (answer.view == 'Add departments') {
                addDepartment()
            } else if (answer.view === 'Add employees') {
                addEmployee()
            } else if (answer.view === 'Update employee roles') {
                updateEmployeeRole()
            } else if (answer.view === 'Delete employees') {
                deleteEmployees()
            } else {
                db.end()
            }
        })
}

mainPrompt()