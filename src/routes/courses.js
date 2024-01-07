import express from 'express';
import { getCoursesByParams, verifyQueryParams, addNewCourse } from '../controllers/courses.js';


const router = express.Router();

router.get("/", verifyQueryParams, getCoursesByParams);

router.post("/", addNewCourse);

export default router;