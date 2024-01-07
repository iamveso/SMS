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
`;

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
    .join(", ");
  console.log(setClause);
  const query = `UPDATE students
    SET ${setClause}
    WHERE matric_no = $1;`;
  console.log(query);
  return query;
};

export const insert_student = (studentObject) => {
  const keys = Object.keys(studentObject);
  const values = Object.values(studentObject);
  const query = `
        INSERT INTO students (${keys.join(", ")})
        VALUES (${values.map((value, index) => `$${index + 1}`).join(", ")})`;

  console.log(query);
  return { query, values };
};

export const fetchWithParams = (studentObject, tablename) => {
  const filteredStudentObject = Object.entries(studentObject)
    .filter(([key, value]) => value !== undefined)
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  const keys = Object.keys(filteredStudentObject);
  const values = Object.values(filteredStudentObject);

  // If all values are undefined, return an empty query
  if (keys.length === 0) {
    return { query: "", values: [] };
  }
  let query = "";
  const conditions = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(" AND ");
  if (tablename == "students"){
    query = `
    SELECT * FROM ${tablename}
    WHERE ${conditions} AND isDeleted = false`;
  }else{
    query = `
    SELECT * FROM ${tablename}
    WHERE ${conditions}`;
  }

  return { query, values };
};

export const generic_insert = (courseObject, tablename) => {
  const keys = Object.keys(courseObject);
  const values = Object.values(courseObject);
  const query = `
        INSERT INTO ${tablename} (${keys.join(", ")})
        VALUES (${values.map((value, index) => `$${index + 1}`).join(", ")})`;

  console.log(query);
  return { query, values };
}
