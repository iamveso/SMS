import { Student } from "./models.js";

//Mock data
const studentDataFromDB = {
    student_id: 'some_student_id_from_db',
    matric_no: 'A12345',
    firstname: 'John',
    lastname: 'Doe',
    level: 2,
    dob: '1995-01-01',
    program_id: 1,
    department_id: 3,
    email: 'john.doe@example.com',
};

let some_student = new Student(studentDataFromDB);

console.log(some_student.getStudentID());

