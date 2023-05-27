INSERT INTO department (name)
VALUES('Data Administration'),
('Software Development'),
('Accounting and Finance'),
('Marketing and Outreach'),
('Human Resource Administration');


INSERT INTO roles (title, salary, department_id)
VALUES('Data Scientist', 10000, 1),
('Senior Software Engineer', 12000, 2),
('Finance Specialist', 6000, 3),
('Lead Accountant', 8000, 3),
('Junior Web Developer', 6000, 2),
('Sales Manager', 8000, 4),
('Talent Recruiter', 7000, 5),
('Customer Representative', 4000, 4);


INSERT INTO employee (first_name, last_name, roles_id, manager_id)
    VALUES('Tom', 'Turner', 6, Null),
    ('John', 'Sean', 4, NULL),
   ('Ashley', 'Handerson', 7, 3),
    ('Anu', 'Bora', 2, NULL),
    ('Jackson', 'Chris', 1, 2),
    ('Bakam', 'Peter', 5, 2),
    ('Thony', 'Jim', 8,  6),
    ('Harmony', 'Cole', 3, 4);
