import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import router from "./Routes/userRoutes";
dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
