import express from 'express';
import 'dotenv/config';
import pg from 'pg';
import { pool } from './dbPool.js';
import { query_all_students, query_student_by_matric } from './queries.js';
import { Student } from './models.js';

const STUDENT_BASEAPI = "api/v1/students";

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

const pg_client = new pg.Client();

app.get(`/${STUDENT_BASEAPI}/getStudents`, async (req, res) =>{
    const result = await pool.query(query_all_students);
    const studentObjects = result.rows.map((row) => {
        return new Student(row);
    });
    res.json(studentObjects);
});

app.get(`/${STUDENT_BASEAPI}/getStudents/:id`, async (req, res) => {
    const result = await pool.query(query_student_by_matric, [req.params.id.toUpperCase()]);
    const studentObjects = result.rows.map((row) => {
        console.log(row);
        return new Student(row);
    });
    if(studentObjects.length < 1){
        res.status(404).send(`Student with matric no ${req.params.id} not found`);
    }else{
        res.status(200).json(studentObjects);
    }
})

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));