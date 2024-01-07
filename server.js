import "dotenv/config";
import app from "./src/index.js";
import studentRouter from "./src/routes/students.js"
import coursesRouter from "./src/routes/courses.js"
import departmentRouter from './src/routes/departments.js'

const PORT = process.env.PORT;

app.use(`/api/v1/students`, studentRouter);
app.use(`/api/v1/courses`, coursesRouter);
app.use(`/api/v1/departments`, departmentRouter);

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
