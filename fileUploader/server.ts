import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import path from "path";
import cors from 'cors'
dotenv.config();
const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname, "./public")));

app.use("/", router);

app.listen(PORT, () => {
  console.log("Server is running at: ", PORT);
});

export default app;