-- Inserting departments into database
INSERT INTO department (name) VALUES ('sales');
INSERT INTO department (name) VALUES ('engineering');
INSERT INTO department (name) VALUES ('finance');
INSERT INTO department (name) VALUES ('HR');


-- Inserting roles into database
INSERT INTO role (title, salary, department_id) VALUES ('Marketer', 60000, 1);
INSERT INTO role (title, salary, department_id)  VALUES ('Intern', 70000, 4);
INSERT INTO role (title, salary, department_id)  VALUES ('Engineer', 90000, 2);
INSERT INTO role (title, salary, department_id)  VALUES ('Accountant', 85000, 3);


-- Inserting employees into database
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Cam', 'Mikesh', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Mark', 'Hamilton', 2, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Adam', 'Jones', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Kobe', 'Bryant', 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Dwayne', 'Johnson', 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Tom', 'Brady', 3, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Elton', 'John', 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Peyton', 'Manning', 1, 1);