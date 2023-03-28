import { Request, Response } from "express";
import { BaseMealDto, MealService } from "../meals";
// res.status(400).json({error:""})
// res.json({meals: allMeals})

export interface MealController {
  getAllMeals(req: Request, res: Response): void;
  getOneMeal(req: Request, res: Response): void;
  createNewMeal(req: Request, res: Response): void;
  updateOneMeal(req: Request, res: Response, changes: BaseMealDto): void;
  deleteOneMeal(req: Request, res: Response): void;
}

const MealController = (MealService: MealService): MealController => {
  const getAllMeals = (req: Request, res: Response): void => {
    const name: string = req.params["name"];
    try {
      const allMeals = MealService.getAllMeals({ name });
      res.send({ status: "OK", data: allMeals });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const getOneMeal = (req: Request, res: Response) => {
    const {
      params: { mealId },
    } = req;
    if (!mealId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':mealId' can not be empty" },
      });
    }
    try {
      const meal = MealService.getOneMeal(mealId);
      res.send({ status: "OK", data: meal });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const createNewMeal = (req: Request, res: Response) => {
    const { body } = req;
    if (
      !body.name ||
      !body.ingredients ||
      !body.recipe ||
      !body.portions 
    ) {
      res.status(400).send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
        },
      });
      return;
    }
    const newMeal: BaseMealDto = {
      name: body.name,
      ingredients: body.ingredient,
      recipe: body.recipe,
      portions: body.portions,
    };
    try {
      const createdMeal = MealService.createNewMeal(newMeal);
      res.status(201).send({ status: "OK", data: createdMeal });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const updateOneMeal = (req: Request, res: Response) => {
    const {
      body,
      params: { mealId },
    } = req;
    if (!mealId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':mealId' can not be empty" },
      });
    }
    try {
      const updatedMeal = MealService.updateOneMeal(mealId, body);
      res.send({ status: "OK", data: updatedMeal });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  const deleteOneMeal = (req: Request, res: Response) => {
    const {
      params: { mealId },
    } = req;
    if (!mealId) {
      res.status(400).send({
        status: "FAILED",
        data: { error: "Parameter ':mealId' can not be empty" },
      });
    }
    try {
      MealService.deleteOneMeal(mealId);
      res.status(204).send({ status: "OK" });
    } catch (error: any) {
      res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
  };

  return {
    getAllMeals,
    getOneMeal,
    createNewMeal,
    updateOneMeal,
    deleteOneMeal,
  };
};

export { MealController };
