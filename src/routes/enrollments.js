import express from "express";
import { enrollCoursesForStudent, deleteCourseFromStudent } from "../controllers/enrollments.js";

const router = express.Router();

router.route("/").post(enrollCoursesForStudent).delete(deleteCourseFromStudent);

export default router;
