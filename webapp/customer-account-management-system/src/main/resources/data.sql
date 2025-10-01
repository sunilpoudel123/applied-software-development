
INSERT INTO CUSTOMER (customer_id, first_name, last_name)
VALUES (1, 'Bob', 'Jones');

INSERT INTO CUSTOMER (customer_id, first_name, last_name)
VALUES (2, 'Anna', 'Smith');

INSERT INTO CUSTOMER (customer_id, first_name, last_name)
VALUES (3, 'Carlos', 'Jimenez');

INSERT INTO ACCOUNT (account_id, account_number, account_type, date_opened, balance, customer_id)
VALUES (2, 'AC1001', 'Savings', '2021-11-15', 125.95, 1);

INSERT INTO ACCOUNT (account_id, account_number, account_type, date_opened, balance, customer_id)
VALUES (1, 'AC1002', 'Savings', '2022-07-11', 15000.00, 2);

INSERT INTO ACCOUNT (account_id, account_number, account_type, date_opened, balance, customer_id)
VALUES (3, 'AC1003', 'Checking', '2022-07-10', 10900.50, 3);
