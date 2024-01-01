import { pool } from "./index.js";

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


export const dbUpdateStudentInfo = async (student) => {
    if(student === null || student === undefined){
        console.log(`Object = [${student}]`);
        return undefined;
    }
    const columns = Object.keys(student).filter((key) => student[key] !== undefined && key !== "matric_no" && typeof student[key] !== 'function');
    const values = columns.map((key, index) => `$${index + 1}`);
    const queryStatement = `UPDATE students
        SET ${columns.map((col, index) => `${col} = ${values[index]}`).join(', ')}
        WHERE matric_no = $${columns.length + 1}
        RETURNING *`;
    
    const queryValues = [...values, student.matric_no];
    const result = pool.query(queryStatement, queryValues);
    console.log(queryValues);
    console.log(queryStatement);
    return result;
}