import express from 'express';

export const BASE_API = "/api/v1";

const app = express();

app.use(express.json());


export default app;