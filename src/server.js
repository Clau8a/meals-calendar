import express from "express";
import dotenv from "dotenv";
import mealRouter from "./meal-module/routes/mealRouter.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use("/api/meals", mealRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});