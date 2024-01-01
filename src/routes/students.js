import express from "express";
import { getAllStudents } from "../controllers/students.js";
import { getStudentByMatricNo } from "../controllers/students.js";
import { updateStudentInfo } from "../controllers/students.js";

const router = express.Router();

/*Get all students in the school NB:Most likely not a useful feature */
router.get("/", getAllStudents);

/*Register a new student */
router.post("/register", (req,res) => {});

/*Get a student by matric number */
router
  .route("/:mat_no")
  .get(getStudentByMatricNo)
  .delete((req, res) => {})
  .put(updateStudentInfo);
/*Update student information */

/*Delete a student from the database. Soft delete */

export default router;