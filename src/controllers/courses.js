import { fetchWithParams, generic_insert } from "../pgdatabase/queries.js";
import { pool } from "../pgdatabase/index.js";

export const verifyQueryParams = (req, res, next) => {
  const queryObject = {
    required_level: parseInt(req.query.required_level),
  };
  console.log(queryObject);
  if (!queryObject.required_level) {
    req.isDefined = false;
    req.queryObj = undefined;
  } else {
    req.isDefined = true;
    req.queryObj = queryObject;
  }
  next();
};

export const getCoursesByParams = async (req, res) => {
  if (req.isDefined === false) {
    res.status(400).send("Cannot Parse Important Info from query params");
    return;
  }
  try {
    let { query, values } = fetchWithParams(req.queryObj, "courses");
    console.log(query);
    console.log(values);
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
  }
};

export const addNewCourse = async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    res.status(400).send("Request Empty");
    return;
  }
  const courseObject = req.body;
  if (
    Object.keys(courseObject).length < 4 ||
    Object.keys(courseObject).some((key) => courseObject[key] === undefined)
  ) {
    res.status(400).send("One or more fields missing");
    return;
  }
  try {
    let { query, values } = generic_insert(courseObject, "courses");
    console.log(values);
    const result = await pool.query(query, values);
    if (!result.rows || result.rowCount < 1) {
      res.status(404).send(`Course Addition Failed`);
      return;
    }
    res.sendStatus(201);
  } catch (error) {
    res.status(400).send(error.detail || error.hint);
    return;
  }
};
