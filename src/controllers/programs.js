import { pool } from "../pgdatabase/index.js";
import { generic_insert } from "../pgdatabase/queries.js";

export const getProgramByParams = async (req, res) => {
  let query = "SELECT * FROM programs";
  if (req.query.department_id !== undefined) {
    query += ` WHERE department_id = $1`;
  }
  try {
    let result;
    if (req.query.department_id !== undefined) {
      result = await pool.query(query, [req.query.department_id]);
    } else {
      result = await pool.query(query);
    }
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
  }
};

export const addNewProgram = async (req, res) => {
  if (!req.body.program_name || !req.body.department_id) {
    //if its undefined,null or empty string
    res.status(400).send("One or More Values Missing from request");
    return;
  }
  try {
    let { query, values } = generic_insert(req.body, "programs");
    console.log(query);
    console.log(values);
    const result = await pool.query(query, values);
    res.status(201).json(result.rows);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
  }
};
