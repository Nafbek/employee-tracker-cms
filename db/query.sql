
-- view all employees
SELECT employee.id, employee.first_name, employee.last_name, roles.title, department.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN roles on employee.roles_id = roles.id LEFT JOIN department on roles.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;

-- view all roles
SELECT roles.id, roles.title, department.name AS department, roles.salary
FROM roles
LEFT JOIN department on roles.department_id = department.id;

-- view all departments

SELECT * FROM department;




-- view employees by manager

SELECT COUNT(employee.id) AS number_employees, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee
LEFT JOIN employee manager ON manager.id = employee.manager_id
GROUP BY manager;

-- view employee by department
SELECT department.name AS department_name, COUNT(employee.id) AS number_employees
FROM employee
JOIN roles ON employee.roles_id = roles.id 
JOIN department ON roles.department_id = department.id
GROUP BY department.name;

