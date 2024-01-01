const STUDENT_TABLE_NAME = "students";
const PROGRAM_TABLE_NAME = "programs";
const DEPARTMENT_TABLE_NAME = "departments";
const COURSE_TABLE_NAME = "courses";
const ENROLLMENT_TABLE_NAME = "enrollments";

// export const query_enroll_multiple = `INSERT INTO ${ENROLLMENT_TABLE_NAME} VALUES (DEFAULT, $1) RETURNING *`;
export const query_register_student = `INSERT INTO ${STUDENT_TABLE_NAME} (
    matric_no,
    firstname,
    lastname,
    level,
    dob,
    program_id,
    department_id,
    email
) VALUES (
    $1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8
)`;

export const query_add_deparment = `INSERT INTO ${DEPARTMENT_TABLE_NAME} (department_name) VALUES ($1)`;
export const query_add_program = `INSERT INTO ${PROGRAM_TABLE_NAME} (program_name, department_id) VALUES ($1,$2)`;