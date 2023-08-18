import express from 'express';
import initWebRoutes from './route/web.js';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
const app = express();

const port = process.env.PORT || 3177;
dotenv.config({ path: '.env' });
app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
initWebRoutes(app);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
