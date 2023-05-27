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









function trial() {

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
                'Add add roles',
                'Add add employees',
                'Update employee roles',
                'Update employee managers',
                'Delete departments',
                'Delete roles',
                'Delete employees'
            ]
        }
    ]

    ).then((answer) => {
        // or i may call the function for each 

        if (answer.view === 'View all employees') {
            const employeeQuery = `SELECT * FROM employee`;
            db.query(employeeQuery, (err, result) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Employees', result)
                trial()
            })
        } else if (answer.view === 'View all roles') {
            db.query(`SELECT roles.id, roles.title, department.name AS department, roles.salary FROM roles LEFT JOIN department on roles.department_id = department.id`, (err, roles) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('Roles', roles)
                trial()
            })
        } else if (answer.view === 'View all departments') {
            
        } 
       
    })
}


trial()