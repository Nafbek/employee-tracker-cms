# Employee Tracker CMS

## Description

This is a content management systems (CMS) commande-line application that manage a company's employee database. It utilizes Node.js, Inquirer, and MySQL. The application allows users to perform operations such as viewing, adding, updating, and deleting employee information. 

## User Story

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria

GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 

## Installation
In order to use this application, make sure to have Node.js and Node Package Manager (npm) on your local machine. Clone the repository, open the root directory of the application on your terminal, and run the command <npm install> to install any required dependecies. This application does not require any other installation otherwise.

## Usage

To start this application, initialize MySQL by running the command <mysql -u root -p> in your terminal. You will be prompted to enter your MySQL password. Then, source data from both the schema.sql and seeds.sql files. Now, within the root directory of the application, run a command <node server.js> in your terminal. You will then be prompted with a question to interact with the application. Use the up and down arrow to navigate through the question's choices, and press the 'enter' key to answer. 

  
You can also watch a walkthrough video that demonsatrates the functionality of the application using the following syntax.

  ![Demo Video] () 
  
## License
N/A

 
