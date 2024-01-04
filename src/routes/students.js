import express from "express";
import { getAllStudents, getStudentByParams, verifyQueryParams } from "../controllers/students.js";
import { getStudentByMatricNo, deleteStudent } from "../controllers/students.js";
import { updateStudentInfo, registerStudent } from "../controllers/students.js";

const router = express.Router();

/*Get all students in the school NB:Most likely not a useful feature */
// router.get("/", getAllStudents);

/*Register a new student */
router.post("/register", registerStudent);

/*Expect only search by level, department and program, other queries will be ignored */
/*Url Query should look something like /search?level=200&department=${department_id}&program=${program_id} */
router.get("/search", verifyQueryParams, getStudentByParams)

/*Get a student by matric number */
router
  .route("/:mat_no")
  .get(getStudentByMatricNo)
  .delete(deleteStudent)
  .put(updateStudentInfo);

export default router;