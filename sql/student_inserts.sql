-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- INSERT INTO students (
--     matric_no,
--     firstname,
--     lastname,
--     level,
--     dob,
--     program_id,
--     department_id,
--     email
-- ) VALUES (
--     '13CK015345',
--     'Chiagor',
--     'Ahaotu',
--     100,
--     '1993-10-15',
--     1,
--     1,
--     'chiagoro.ahaotu@school.edu.ng'
-- );

SELECT * FROM students;

-- SELECT
--     students.*,
--     programs.program_name,
--     departments.department_name
-- FROM
--     students
-- JOIN programs ON students.program_id = programs.program_id
-- JOIN departments ON students.department_id = departments.department_id;

-- SELECT
-- students.*,
-- programs.program_name,
-- departments.department_name,
-- ARRAY_AGG(courses.course_code) AS enrolled_courses,
-- EXTRACT(YEAR FROM AGE(NOW(), students.dob)) AS age
-- FROM
-- students
-- JOIN programs ON students.program_id = programs.program_id
-- JOIN departments ON students.department_id = departments.department_id
-- LEFT JOIN enrollments ON students.student_id = enrollments.student_id
-- LEFT JOIN courses ON enrollments.course_id = courses.course_id
-- GROUP BY
-- students.student_id, programs.program_name, 
-- departments.department_name;
