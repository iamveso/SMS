import { pool } from "../pgdatabase/index.js";
import { generic_insert } from "../pgdatabase/queries.js";

export const enrollCoursesForStudent = async (req, res) => {
  /*{
        student_id: id,
        course_id: id,
        enrollment_date: date,
        semester: semester  //db checks for validity
    }*/
  let date = new Date().toISOString().split(/[TZ]/)[0]; //Only interested in the date and not the time
  if (!date) {
    //Empty string or null or undefined
    res.status(500).send("Unable to get Date");
    return;
  }
  if (!req.body.student_id || !req.body.course_id || !req.body.semester) {
    res.status(400).send("One or More paramters missing");
    return;
  }
  const Obj = {
    student_id: req.body.student_id,
    course_id: req.body.course_id,
    enrollment_date: req.body.enrollment_date,
    semester: req.body.semester,
  };
  try {
    let { query, values } = generic_insert(Obj, "enrollments");
    var result = await pool.query(query, values);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
    return;
  }

  res.status(201).json(result.rows);
};

export const deleteCourseFromStudent = async (req, res) => {
  /*{
        student_id: id,
        course_id: id
    }*/
  if (!req.body.student_id || !req.body.course_id) {
    res.status(400).send("One or More paramters missing");
    return;
  }
  const query = `DELETE FROM enrollments WHERE student_id = $1 AND course_id = $2`;
  try {
    await pool.query(query, [req.body.student_id, req.body.course_id]);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
    return;
  }
  res.sendStatus(200);
};
