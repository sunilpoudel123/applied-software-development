-- Display the list of ALL Dentists registered in the system, sorted in ascending order of their lastNames

SELECT
    dentist_id,
    first_name,
    last_name,
    phone,
    email,
    specialization
FROM dentist
ORDER BY last_name ASC;

-- Display the list of ALL Appointments for a given Dentist by their dentist_Id number. Include in the result, the Patient information.

SELECT
    a.appointment_id,
    a.appointment_date,
    a.appointment_time,
    a.status AS appointment_status,
    a.dentist_id,
    d.first_name AS dentist_first_name,
    d.last_name AS dentist_last_name,
    a.patient_id,
    p.first_name AS patient_first_name,
    p.last_name AS patient_last_name,
    p.phone AS patient_phone,
    p.email AS patient_email,
    p.address AS patient_address,
    p.date_of_birth AS patient_dob,
    a.surgery_id
FROM appointment a
         INNER JOIN dentist d ON a.dentist_id = d.dentist_id
         INNER JOIN patient p ON a.patient_id = p.patient_id
ORDER BY a.appointment_date DESC, a.appointment_time DESC;

-- Display the list of ALL Appointments that have been scheduled at a Surgery Location

SELECT
    a.appointment_id,
    a.appointment_date,
    a.appointment_time,
    a.status AS appointment_status,
    s.surgery_id,
    s.name AS surgery_name,
    s.address AS surgery_address,
    s.phone AS surgery_phone,
    d.dentist_id,
    d.first_name AS dentist_first_name,
    d.last_name AS dentist_last_name,
    p.patient_id,
    p.first_name AS patient_first_name,
    p.last_name AS patient_last_name
FROM appointment a
         INNER JOIN surgery s ON a.surgery_id = s.surgery_id
         INNER JOIN dentist d ON a.dentist_id = d.dentist_id
         INNER JOIN patient p ON a.patient_id = p.patient_id
ORDER BY s.surgery_id, a.appointment_date, a.appointment_time;

-- Display the list of the Appointments booked for a given Patient on a given Date.

SELECT
    a.appointment_id,
    a.appointment_date,
    a.appointment_time,
    a.status AS appointment_status,
    a.patient_id,
    p.first_name AS patient_first_name,
    p.last_name AS patient_last_name,
    p.phone AS patient_phone,
    p.email AS patient_email,
    d.dentist_id,
    d.first_name AS dentist_first_name,
    d.last_name AS dentist_last_name,
    d.specialization AS dentist_specialization,
    s.surgery_id,
    s.name AS surgery_name,
    s.address AS surgery_address
FROM appointment a
         INNER JOIN patient p ON a.patient_id = p.patient_id
         INNER JOIN dentist d ON a.dentist_id = d.dentist_id
         INNER JOIN surgery s ON a.surgery_id = s.surgery_id
ORDER BY a.appointment_date, a.appointment_time;