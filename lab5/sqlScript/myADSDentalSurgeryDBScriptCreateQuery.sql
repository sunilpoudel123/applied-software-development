use ads_dental;
-- sample data inserts for dental appointment system

insert into user (username, password, role) values
                                                ('manager1', 'hash123', 'officemanager'),
                                                ('dentist1', 'hash234', 'dentist'),
                                                ('patient1', 'hash345', 'patient');

insert into office_manager (first_name, last_name, phone, email, user_id) values
    ('Anita', 'Sharma', '555-1111', 'anita.sharma@example.com', 1);

insert into dentist (first_name, last_name, phone, email, specialization, user_id) values
    ('Ravi', 'Kumar', '555-2222', 'ravi.kumar@example.com', 'Orthodontist', 2);

insert into patient (first_name, last_name, phone, email, address, date_of_birth, user_id) values
    ('Sunil', 'Verma', '555-3333', 'sunil.verma@example.com', '123 Main St', '1995-04-15', 3);

insert into surgery (name, address, phone) values
    ('Downtown Dental Clinic', '456 Elm St', '555-4444');

insert into appointment (appointment_date, appointment_time, status, dentist_id, patient_id, surgery_id) values
    ('2025-10-10', '10:00:00', 'booked', 1, 1, 1);

insert into bill (appointment_id, amount, status, issue_date) values
    (1, 150.00, 'unpaid', '2025-10-06');