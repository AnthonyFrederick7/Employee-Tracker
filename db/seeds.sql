INSERT INTO department (name) VALUES ('sales');
INSERT INTO department (name) VALUES ('engineering');
INSERT INTO department (name) VALUES ('finance');
INSERT INTO department (name) VALUES ('HR');


INSERT INTO role (title, salary, department_id) VALUES ('Marketer', 60000, 1);
INSERT INTO role (title, salary, department_id)  VALUES ('Intern', 70000, 4);
INSERT INTO role (title, salary, department_id)  VALUES ('Engineer', 90000, 2);
INSERT INTO role (title, salary, department_id)  VALUES ('Accountant', 85000, 3);


INSERT INTO employee (first_name, last_name, role_id) VALUES ('Jane', 'Austen', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mark', 'Twain', 2, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Lewis', 'Carroll', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Andre', 'Asselin', 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Jill', 'Tchaikovsky', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Debbie', 'Smith', 3, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Thomas', 'Motorola', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Darcy', 'Antone', 1, 1);