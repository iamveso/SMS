const STUDENT_TABLE_NAME = "students";
const PROGRAM_TABLE_NAME = "programs";
const DEPARTMENT_TABLE_NAME = "departments";
const COURSE_TABLE_NAME = "courses";
const ENROLLMENT_TABLE_NAME = "enrollments";

export const query_all_students =`SELECT
${STUDENT_TABLE_NAME}.*,
${PROGRAM_TABLE_NAME}.program_name,
${DEPARTMENT_TABLE_NAME}.department_name,
ARRAY_AGG(${COURSE_TABLE_NAME}.course_code) AS enrolled_courses,
EXTRACT(YEAR FROM AGE(NOW(), ${STUDENT_TABLE_NAME}.dob)) AS age
FROM
${STUDENT_TABLE_NAME}
JOIN programs ON ${STUDENT_TABLE_NAME}.program_id = ${PROGRAM_TABLE_NAME}.program_id
JOIN departments ON ${STUDENT_TABLE_NAME}.department_id = ${DEPARTMENT_TABLE_NAME}.department_id
LEFT JOIN ${ENROLLMENT_TABLE_NAME} ON ${STUDENT_TABLE_NAME}.student_id = ${ENROLLMENT_TABLE_NAME}.student_id
LEFT JOIN ${COURSE_TABLE_NAME} ON ${ENROLLMENT_TABLE_NAME}.course_id = ${COURSE_TABLE_NAME}.course_id
GROUP BY
${STUDENT_TABLE_NAME}.student_id, ${PROGRAM_TABLE_NAME}.program_name, 
${DEPARTMENT_TABLE_NAME}.department_name`;

export const query_student_by_matric = `SELECT
${STUDENT_TABLE_NAME}.*,
${PROGRAM_TABLE_NAME}.program_name,
${DEPARTMENT_TABLE_NAME}.department_name,
ARRAY_AGG(${COURSE_TABLE_NAME}.course_code) AS enrolled_courses,
EXTRACT(YEAR FROM AGE(NOW(), ${STUDENT_TABLE_NAME}.dob)) AS age
FROM
${STUDENT_TABLE_NAME}
JOIN programs ON ${STUDENT_TABLE_NAME}.program_id = ${PROGRAM_TABLE_NAME}.program_id
JOIN departments ON ${STUDENT_TABLE_NAME}.department_id = ${DEPARTMENT_TABLE_NAME}.department_id
LEFT JOIN ${ENROLLMENT_TABLE_NAME} ON ${STUDENT_TABLE_NAME}.student_id = ${ENROLLMENT_TABLE_NAME}.student_id
LEFT JOIN ${COURSE_TABLE_NAME} ON ${ENROLLMENT_TABLE_NAME}.course_id = ${COURSE_TABLE_NAME}.course_id
WHERE matric_no = $1
GROUP BY
${STUDENT_TABLE_NAME}.student_id, ${PROGRAM_TABLE_NAME}.program_name, 
${DEPARTMENT_TABLE_NAME}.department_name`;