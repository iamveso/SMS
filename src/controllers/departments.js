import { fetchWithParams, generic_insert } from "../pgdatabase/queries.js";
import { pool } from "../pgdatabase/index.js";

export const addNewDepartment = async (req, res) => {
    if(req.body.department_name === undefined) {
        res.status(400).send("Department Name Missing");
        return;
    }
    try {
        let { query, values } = generic_insert(req.body, "departments");
        console.log(query);
        console.log(values);
        const result = await pool.query(query, values);
        res.status(201).json(result.rows);
      } catch (error) {
        res.status(400).send(error.detail || error.hint);
      }
}

export const getAllDepartments = async (req, res) => {
    const query = "SELECT * FROM departments"
    try {
        const result = await pool.query(query);
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(400).send(error.detail || error.hint);
      }
}