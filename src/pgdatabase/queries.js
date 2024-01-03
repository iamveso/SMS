import { pool } from "./index.js";

const STUDENT_TABLE_NAME = "students";
const PROGRAM_TABLE_NAME = "programs";
const DEPARTMENT_TABLE_NAME = "departments";
const COURSE_TABLE_NAME = "courses";
const ENROLLMENT_TABLE_NAME = "enrollments";

export const soft_delete_student = `
UPDATE students
    SET isDeleted = true
    WHERE matric_no = $1;
`


export const get_student = `
WITH EnrolledCourses AS (
    SELECT
        s.student_id,
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT c.course_code), NULL) AS enrolled_courses,
        SUM(DISTINCT c.units) AS reg_units
    FROM
        students s
    JOIN
        enrollments e ON s.student_id = e.student_id
    JOIN
        courses c ON e.course_id = c.course_id
    GROUP BY
        s.student_id
)

SELECT
    s.student_id,
    s.matric_no,
    s.firstname,
    s.lastname,
    s.level,
    s.dob,
    EXTRACT(YEAR FROM AGE(s.dob)) AS age,
    s.program_id,
    s.department_id,
    p.program_name,
    d.department_name,
    s.email,
    ec.enrolled_courses,
    ec.reg_units
FROM
    students s
JOIN
    programs p ON s.program_id = p.program_id
JOIN
    departments d ON s.department_id = d.department_id
LEFT JOIN
    EnrolledCourses ec ON s.student_id = ec.student_id
WHERE
    s.matric_no = $1 AND isDeleted = false;
`;

export const update_student = (studentObject) => {
    const setClause = Object.entries(studentObject)
                            .filter(([key, value]) => value !== undefined && key != "matric_no")
                            .map(([key, value]) => `${key} = '${value}'`)
                            .join(', ');
    console.log(setClause);
    const query = 
    `UPDATE students
    SET ${setClause}
    WHERE matric_no = $1;`;
    console.log(query);
    return query;
}