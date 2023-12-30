--DB NAME IS student_management


-- Courses Table
CREATE TABLE IF NOT EXISTS courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(100),
    course_code VARCHAR(20),
    required_level INT,
    units INT
);

-- Departments Table
CREATE TABLE IF NOT EXISTS departments (
    department_id SERIAL PRIMARY KEY,
    department_name VARCHAR(255) UNIQUE
);
-- Programs Table
CREATE TABLE IF NOT EXISTS programs (
    program_id SERIAL PRIMARY KEY,
    program_name VARCHAR(255) UNIQUE,
    department_id INT REFERENCES departments(department_id) -- Foreign key reference
);


-- Students Table
CREATE TABLE IF NOT EXISTS students (
    student_id UUID PRIMARY KEY,
    matric_no VARCHAR(255) UNIQUE,
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    level INT,
    dob DATE,
    program_id INT REFERENCES programs(program_id),
    department_id INT REFERENCES departments(department_id),
    email VARCHAR(255) UNIQUE
);
-- Enrollments Table
CREATE TABLE IF NOT EXISTS enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id UUID REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    enrollment_date DATE,
    semester VARCHAR(20),
    CONSTRAINT valid_semester CHECK (semester IN ('First', 'Second'))
);
