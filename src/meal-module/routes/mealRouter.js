import { Router } from "express";
import * as MealController from "../controllers/mealController.js";


const router = Router();

router.get("/", MealController.getAllMeals);
router.get("/:mealId", MealController.getOneMeal);

router.post("/", MealController.createNewMeal);
router.put("/:mealId", MealController.updateOneMeal);
router.delete("/:mealId", MealController.deleteOneMeal);


export default router;
