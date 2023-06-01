const inquirer = require('inquirer');
const db = require('./config/connection')




//
const viewAllEmployees = () => {
    const employeeQuery = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
    FROM employee LEFT JOIN roles on employee.roles_id = roles.id 
    LEFT JOIN department on roles.department_id = department.id 
    LEFT JOIN employee manager on manager.id = employee.manager_id`
    
    //
    db.promise().query(employeeQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//
const viewAllRoles = () => {
    const roleQuery = `SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id`

    //
    db.promise().query(roleQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//
const viewAllDepartments = () => {
    const departmentQuery = `SELECT * FROM department`

    //
    db.promise().query(departmentQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//
const viewEmployeeByManager = () => {
    const employManagerQuery = `SELECT COUNT(employee.id) AS number_employees, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id GROUP BY manager`

    //
    db.promise().query(employManagerQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

//
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department',
            name: 'nameOfDepartment'
        }
    ])
        .then((answer) => {
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

//
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

//
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

//
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
    SET roles_id = SELECT id FROM roles WHERE title = '${answer.newRole}' 
    WHERE CONCAT(first_name, '', last_name) = '${answer.updateEmployeeName}'`
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

//
const updateEmployeeManager = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: "Which employee's manager do you want to update?",
            name: 'updateEmployeeManager',
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
            type: 'input',
            message: 'What is the first name of the new manager?',
            name: 'managerFirstName',

        },
        {
            type: 'input',
            message: 'What is the last name of the new manager?',
            name: 'managerLastName',

        },
    ])
        .then((answer) => {
            const updateManagerQuery = `UPDATE employee SET manager_id = (SELECT employee.id FROM employee 
            LEFT JOIN employee manager ON manager.id = employee.manager_id
    WHERE CONCAT(manager.first_name, " ", manager.last_name) = CONCAT('${answer.managerFirstName}', " ", '${answer.managerLastName}'))`
            db.promise().query(updateManagerQuery)
                .then(() => {

                    console.log(` Updated employee's manager`)
                    mainPrompt()
                })
                .catch((err) => {
                    console.log(err)
                    db.end()
                })
        })

}

const deleteEmployees = () => {
    inquirer.prompt(
        {
            type: 'input',
            message: "What is the employee's id?",
            name: 'employeeId',

        })
        .then((answer)=>{
  const deleteEmployeeQuery = `DELETE FROM employee WHERE id = '${answer.employeeId}'`
 
  const displayDeleted = `SELECT CONCAT(employee.first_name, " ", employee.last_name) WHERE employee.id = '${answer.employeeId}`;
    db.promise().query(deleteEmployeeQuery)
    
        .then(() => {
            
            console.log(displayDeleted  + 'deleted from the list.')
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
            db.end()
        })
        })
}

//
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
                'Update employee managers',
                'Delete employees',
                'Delete departments',
                'Delete roles'
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
        } else if (answer.view === 'Update employee managers') {
            updateEmployeeManager()
        } else if (answer.view === 'Delete employees') {
            deleteEmployees()
        } else if (answer.view === 'Delete departments') {
            deleteDepartment()
        } else if (answer.view === 'Delete roles') {
            deleteRoles()
        } else {
            db.end()
        }
    })
}

mainPrompt()