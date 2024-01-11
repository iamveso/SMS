import { pool } from "../pgdatabase/index.js";
import { StudentDetails as Student } from "../models/students.js";
import {
  fetchWithParams,
  get_student,
  insert_student,
  soft_delete_student,
  update_student,
} from "../pgdatabase/queries.js";

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
    const result = await pool.query(get_student, [
      req.params.mat_no.toUpperCase(),
    ]);
    if (!result.rows || result.rowCount < 1) {
      res
        .status(404)
        .send(`student with mat no ${req.params.mat_no} not Found`);
      return;
    }
    const studentObjects = result.rows.map((row) => row);
    res.json(studentObjects[0]);
  } catch (error) {
    res.status(400).send(error.hint || error.detail);
    return;
  }
};

export const updateStudentInfo = async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  try {
    const result = await pool.query(update_student(req.body), [
      req.params.mat_no.toUpperCase(),
    ]);
    console.log(result.rowCount);
    if (!result.rows || result.rowCount < 1) {
      res
        .status(404)
        .send(`student with mat no ${req.params.mat_no} not Found`);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
    return;
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const result = await pool.query(soft_delete_student, [
      req.params.mat_no.toUpperCase(),
    ]);
    if (!result.rows || result.rowCount < 1) {
      res
        .status(404)
        .send(`student with mat no ${req.params.mat_no} not Found`);
      return;
    }
    const studentObjects = result.rows.map((row) => row);
    res.json(studentObjects[0]);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
    return;
  }
};

export const registerStudent = async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    return;
  }
  const studentObject = Object.create({
    sharedProperty: 'Shared Value'
  }, {
    matric_no: { value: req.body.matric_no, writable: true, enumerable: true },
    firstname: { value: req.body.firstname, writable: true, enumerable: true },
    lastname: { value: req.body.lastname, writable: true, enumerable: true },
    level: { value: parseInt(req.body.level), writable: true, enumerable: true },
    dob: { value: req.body.dob, writable: true, enumerable: true },
    program_id: { value: parseInt(req.body.program_id), writable: true, enumerable: true },
    department_id: { value: parseInt(req.body.department_id), writable: true, enumerable: true },
    email: { value: req.body.email, writable: true, enumerable: true }
  });
  console.log(studentObject);
  //If keys are less than 8 or 1 key has a value of undefined
  if (Object.entries(studentObject).length < 8 || Object.keys(studentObject).some(key => studentObject[key] === undefined)) {
    res.status(400).send("One or More fields Missing");
    return;
  }
  try {
    let {query, values} = insert_student(req.body);
    console.log(values);
    const result = await pool.query(query, values);
    if (!result.rows || result.rowCount < 1) {
      res
        .status(404)
        .send(`Registration Failed`);
      return;
    }
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
    return;
  }
};


export const verifyQueryParams = (req, res, next) => {
  const queryObject = {
    level: req.query.level,
    department_id: req.query.department_id,
    program_id: req.query.program_id
  };
  console.log(queryObject);
  if (!queryObject.level && !queryObject.department_id && !queryObject.program_id){
    req.isDefined = false;
    req.queryObj = undefined;
  }else{
    req.isDefined = true;
    req.queryObj = queryObject;
  }
  next();
}

export const getStudentByParams = async (req, res) => {
  if(req.isDefined === false){
    res.status(400).send("Cannot Parse Important Info from query params");
    return;
  }
  
  try {
    let {query, values} = fetchWithParams(req.queryObj, "students");
    console.log(query);
    console.log(values);
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).send(error);
    return;
  }
}