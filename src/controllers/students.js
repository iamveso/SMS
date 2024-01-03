import { pool } from "../pgdatabase/index.js";
import { get_student, soft_delete_student, update_student} from "../pgdatabase/queries.js";

class Student {
  constructor({
    student_id,
    matric_no,
    firstname,
    lastname,
    level,
    dob,
    email,
    age,
    program_id,
    department_id,
    program_name,
    department_name,
    enrolled_courses,
  }) {
    //Properties
    let _student_id = student_id; //private
    let _program_id = program_id;
    let _department_id = department_id;
    this.matric_no = matric_no;
    this.firstname = firstname;
    this.lastname = lastname;
    this.level = level;
    this.dob = dob;
    this.program_name = program_name;
    this.department_name = department_name;
    this.email = email;
    this.age = age;
    this.enrolled_courses = Array.from(new Set(enrolled_courses));
    //Methods
    this._getStudentID = () => _student_id;
    this._getProgramID = () => _program_id;
    this._getDepartmentID = () => _department_id;
  }

  getStudentID() {
    return Object.freeze({ id: this._getStudentID() });
  }
  getProgramID() {
    return Object.freeze({ id: this._getProgramID() });
  }
  getDepartmentID() {
    return Object.freeze({ id: this._getDepartmentID() });
  }
}

export const getAllStudents = async (req, res) => {
  const result = await pool.query(query_all_students);
  if (!result) {
    res.status(404).send("No Record Found");
    return;
  }
  const studentObjects = result.rows.map((row) => row);
  res.json(studentObjects);
};

export const getStudentByMatricNo = async (req, res) => {
  try {
    const result = await pool.query(get_student, [req.params.mat_no.toUpperCase()]);
    if (!result.rows || result.rowCount < 1) {
      res.status(404).send(`student with mat no ${req.params.mat_no} not Found`);
      return;
    }
    const studentObjects = result.rows.map((row) => row);
    res.json(studentObjects[0])
  } catch (error) {
    res.status(400).send(error.hint || error.detail);
    return;
  }
}

export const updateStudentInfo =  async (req, res) => {
    if(!req.body){
      res.sendStatus(400);
      return;
    }
    try {
      const result = await pool.query(update_student(req.body), [req.params.mat_no.toUpperCase()]);
      console.log(result.rowCount)
      if (!result.rows || result.rowCount < 1) {
        res.status(404).send(`student with mat no ${req.params.mat_no} not Found`);
        return;
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error.detail || error.hint);
      return;
    }
}

export const deleteStudent = async (req, res) => {
  try {
    const result = await pool.query(soft_delete_student, [req.params.mat_no.toUpperCase()]);
    if (!result.rows || result.rowCount < 1) {
      res.status(404).send(`student with mat no ${req.params.mat_no} not Found`);
      return;
    }
    const studentObjects = result.rows.map((row) => row);
    res.json(studentObjects[0])
  } catch (error) {
    res.status(400).send(error.detail || error.hint)
    return;
  }
}
