import "dotenv/config";
import app from "./src/index.js";
import studentRouter from "./src/routes/students.js"
import coursesRouter from "./src/routes/courses.js"

const PORT = process.env.PORT;

app.use(`/api/v1/students`, studentRouter);
app.use(`/api/v1/courses`, coursesRouter);

app.listen(PORT, () => console.log(`App Running on port ${PORT}`));
