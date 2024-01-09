import express from 'express';
import { getProgramByParams, addNewProgram } from '../controllers/programs.js';

const router = express.Router();

router.get("/", getProgramByParams);

router.post("/", addNewProgram);

export default router;