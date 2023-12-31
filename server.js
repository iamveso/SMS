import express from "express";
import "dotenv/config";
import pg from "pg";
import { pool } from "./dbPool.js";
import { query_all_students, query_register_student, query_student_by_matric } from "./queries.js";
import { CourseData, EnrollmentData, Student } from "./models.js";

const API_VERSION = "api/v1";

const STUDENT_BASEAPI = `${API_VERSION}/students`;
const ENROLLMENT_BASEAPI = `${API_VERSION}/enroll`;

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

const pg_client = new pg.Client();

//Get all students /*Further changes?*/
app.get(`/${STUDENT_BASEAPI}/getStudents`, async (req, res) => {
  const result = await pool.query(query_all_students);
  const studentObjects = result.rows.map((row) => {
    return new Student(row);
  });
  res.json(studentObjects);
});

//Get a particular student
app.get(`/${STUDENT_BASEAPI}/getStudents/:id`, async (req, res) => {
  const result = await pool.query(query_student_by_matric, [
    req.params.id.toUpperCase(),
  ]);
  const studentObjects = result.rows.map((row) => {
    return new Student(row);
  });
  if (studentObjects.length < 1) {
    res.status(404).send(`Student with matric no ${req.params.id} not found`);
  } else {
    res.status(200).json(studentObjects);
  }
});

//Register a student
app.post(`/${STUDENT_BASEAPI}/register`, async (req, res) => {
    let r = req.body;
    let isUseable = r.matric_no && r.firstname && r.lastname && r.level && r.dob && r.program_id && r.department_id && r.email;
    if (!isUseable){
        res.status(400).send("Missing Item in One or more properties");
        return;
    }
    try {
        var result = await pool.query(query_register_student, [r.matric_no, r.firstname, r.lastname, r.level, r.dob, r.program_id, r.department_id, r.email]);
    } catch (error) {
        res.status(400).send(error.detail);
    }finally{
        if(!result){
            return;
        }
    }
    res.sendStatus(200);
});

//Add new course
app.post(`/${ENROLLMENT_BASEAPI}/course`, async (req, res) => {
  //A list of courses should be sent
  if (!req.body.length || req.body.length === 0) {
    res.status(400).send(`Expecting a List`);
    return;
  }
  const course_list = [];
  let iter_result = req.body.every((item) => {
    let set = new CourseData(item).isSet() ? true : false;
    if (set) {
      course_list.push(item);
    }
    return set;
  });
  if (iter_result === false) {
    res.status(400).send("Missing Item in One or more properties");
    return;
  }
  for (const valuesObject of course_list) {
    const values = Object.values(valuesObject);
    const placeholders = Array.from(
      { length: values.length },
      (_, i) => `$${i + 1}`
    ).join(", ");
    const query = `INSERT INTO courses VALUES (DEFAULT, ${placeholders}) RETURNING *`;
    try {
      var result = await pool.query(query, values); //I want to access this variable in finally
    } catch (error) {
      res.status(400).send(error.detail);
    } finally {
      if (result) {
      } else {
        return; //Error code has been sent so we return out of the function
      }
    }
  }
  res.sendStatus(201);
});

app.post(`/${ENROLLMENT_BASEAPI}/student`, async (req, res) => {
  if (!req.body.length || req.body.length === 0) {
    res.status(400).send(`Expecting a List`);
    return;
  }
  const enrollment_data_list = [];
  let iter_result = req.body.every((item) => {
    let set = new EnrollmentData(item).isSet() ? true : false;
    if (set) {
      enrollment_data_list.push(item);
    }
    return set;
  });
  if (iter_result === false) {
    res.status(400).send("Missing Item in One or more properties");
    return;
  }
  for (const valuesObject of enrollment_data_list) {
    const values = Object.values(valuesObject);
    const placeholders = Array.from(
      { length: values.length },
      (_, i) => `$${i + 1}`
    ).join(", ");
    const query = `INSERT INTO enrollments VALUES (DEFAULT, ${placeholders}) RETURNING *`;
    try {
      var result = await pool.query(query, values); //I want to access this variable in finally
    } catch (error) {
      res.status(400).send(error.detail);
    } finally {
      if (result) {
      } else {
        return; //Error code has been sent so we return out of the function
      }
    }
  }
  res.sendStatus(201);
});

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
