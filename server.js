const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',

        user: 'root',

        password: 'Go4server@2023',
        database: 'employee_db'
    },
    console.log('Connected to database!')
);

// class / constructor??

const viewAllEmployees = ()=> {
    const employeeQuery = `SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id`
    db.promise().query(employeeQuery)
        .then(([result]) => {
            console.table(result)
            mainPrompt()
        })
        .catch((err) => {
            console.log(err)
        })
}

const viewAllRoles = ()=>{
    const roleQuery = `SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id`

    db.promise().query(roleQuery)  
    .then(([result]) => {
        console.table(result)
        mainPrompt()
    })
    .catch((err) => {
        console.log(err)
    })
}

const viewAllDepartments = ()=>{
    const departmentQuery = `SELECT * FROM department`

    db.promise().query(departmentQuery)  
    .then(([result]) => {
        console.table(result)
        mainPrompt()
    })
    .catch((err) => {
        console.log(err)
    })
}

const viewEmployeeByManager = ()=>{
    const employManagerQuery = `SELECT COUNT(employee.id) AS number_employees, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager ON manager.id = employee.manager_id GROUP BY manager`

    db.promise().query(employManagerQuery)  
    .then(([result]) => {
        console.table(result)
        mainPrompt()
    })
    .catch((err) => {
        console.log(err)
    })
}

const addDepartment = ()=>{
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department',
            name: 'nameOfDepartment'
        }
    ])
    .then((answer)=>{
        db.promise().query(`INSERT INTO department (name) VALUES('${answer.nameOfDepartment}')`)  
    .then(() => {
        
        console.log( ` '${answer.nameOfDepartment}' added to the department`)
        mainPrompt()
    })
    .catch((err) => {
        console.log(err)
        db.end()
    })
    })
}

const addRole = ()=>{
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
    .then((answer)=>{
        db.promise().query( `INSERT INTO roles (title, salary, department_id) VALUES ('${answer.nameOfRole}', '${answer.salary}', (SELECT id FROM department WHERE name = '${answer.roleDepartment}'))`)  
    .then(() => {
        
        console.log( ` '${answer.nameOfRole}' added to the role`)
        mainPrompt()
    })
    .catch((err) => {
        console.log(err)
        db.end()
    })
    })
}



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
                'Delete departments',
                'Delete roles',
                'Delete employees'
            ]
        }
    //    ,
    //     {
    //         type: 'input',
    //         message: 'What is the name of the role',
    //         name: 'nameOfRole'
    //     },
    //     {
    //         type: 'input',
    //         message: 'What is the salary of the role',
    //         name: 'salary'
    //     },
    //     {
    //         type: 'list',
    //         message: 'Which department does the role belong to',
    //         name: 'roleDepartment',
    //         choices: [
    //             'Data Administration',
    //             'Software Development',
    //             'Accounting and Finance',
    //             'Marketing and Outreach',
    //             'Human Resource Administration'
    //         ]
    //     },
        // {
        //     type: 'input',
        //     message: 'What is the employee first name',
        //     name: 'firstName'
        // },
        // {
        //     type: 'input',
        //     message: 'What is the employee last name',
        //     name: 'lastName'
        // },
        // {
        //     type: 'list',
        //     message: 'What is the employee role',
        //     name: 'roleOfEmployee',
        //     choices: [
        //         'Data Scientist',
        //         'Senior Software Engineer',
        //         'Finance Specialist',
        //         'Lead Accountant',
        //         'Junior Web Developer',
        //         'Sales Manager',
        //         'Talent Recruiter', 
        //         'Customer Representative',
        //         'Data analyist',
        //         'Project Manager'
        //     ]
        // },
        // {
        //     type: 'list',
        //     message: 'Which employee role do you want to update',
        //     name: 'roleOfEmployee',
        //     choices: [
        //         'Data Scientist',
        //         'Senior Software Engineer',
        //         'Finance Specialist',
        //         'Lead Accountant',
        //         'Junior Web Developer',
        //         'Sales Manager',
        //         'Talent Recruiter', 
        //         'Customer Representative',
        //         'Data analyist',
        //         'Project Manager'
        //     ]
        // },

    ]

    ).then((answer) => {
                    // or i may call the function for each 

                    if (answer.view === 'View all employees') {
                        viewAllEmployees()
                       

                    } else if (answer.view === 'View all roles') {
                        viewAllRoles()

                        
                    } else if (answer.view === 'View all departments') {
                        viewAllDepartments()
                      
                    } else if (answer.view === 'View employee by manager') {
                        viewEmployeeByManager()
                       
                    } 
                    else if (answer.view === 'Add roles') {
                      addRole()
                    } 
                    else if (answer.view == 'Add departments'){
                        addDepartment()                      
                        
                    }
                    

                })
}


mainPrompt()