import { Router } from "express";
import { MealController } from "../controllers/mealController";
import { MealService } from "../service/mealService";

const mealRouter = (): Router => {
  const router: Router = Router();
  const MealServiceI = MealService();
  const MealControllerI = MealController(MealServiceI);
  router.get("/", MealControllerI.getAllMeals);
  router.get("/:mealId", MealControllerI.getOneMeal);

  router.post("/", MealControllerI.createNewMeal);
  // router.put("/:mealId", MealControllerI.updateOneMeal);
  router.delete("/:mealId", MealControllerI.deleteOneMeal);

  return router;
};

export { mealRouter };
