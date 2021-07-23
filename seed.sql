INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Human Resources"), ("Legal"), ("Finance"), ("Artist");

INSERT INTO role (title, salary, department_id)
VALUES ("CEO", "100000", "1"), ("Software Developer", "70000", "2"), ("Lawyer", "60000", "3"), ("Engineer", "60000", "4"), ("Artist", "70000", "5"), ("Salesperson", "40000", "6");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan, Crowder", "1", "1"), ("Julian", "Pedraza", "2", "1"), ("Dauphine", "Burns", "3", "1"), ("Taegan", "Loyelle", "4", "3"), ("David", "Pedraza", "5", "1"), ("Jason", "Bailey", "Artist", "6", "1"), ("Jordan", "Vasquez", "6", "1");