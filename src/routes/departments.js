import express from 'express';
import { addNewDepartment, getAllDepartments } from '../controllers/departments.js';

const router = express.Router();

router.post("/", addNewDepartment);

router.get("/", getAllDepartments);

export default router;