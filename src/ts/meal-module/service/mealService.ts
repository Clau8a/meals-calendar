import {v4 as uuid} from 'uuid';
import * as Meal from "../../database/Meal";
import { BaseMealDto, FilterParams, MealDto } from "../meals";

export interface MealService {
  getAllMeals({ name }: FilterParams): Array<MealDto>;
  getOneMeal(mealId: string): MealDto;
  createNewMeal(newMeal: BaseMealDto): MealDto;
  updateOneMeal(mealId: string, changes: BaseMealDto): MealDto;
  deleteOneMeal(mealId: string): void;
}

const MealService = (): MealService => {
  const getAllMeals = ({ name }: { name: string }): Array<MealDto> => {
    try {
      const allMeals = Meal.getAllMeals({ name });
      return allMeals;
    } catch (error) {
      throw error;
    }
  };

  const getOneMeal = (mealId: string): MealDto => {
    try {
      const meal = Meal.getOneMeal(mealId);
      return meal;
    } catch (error) {
      throw error;
    }
  };

  const createNewMeal = (newMeal: BaseMealDto): MealDto => {
    const mealToInsert = {
      ...newMeal,
      id: uuid(),
      createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    try {
      const createdMeal = Meal.createNewMeal(mealToInsert);
      return createdMeal;
    } catch (error) {
      throw error;
    }
  };

  const updateOneMeal = (mealId: string, changes: BaseMealDto):MealDto => {
    try {
      const updatedMeal = Meal.updateOneMeal(mealId, changes);
      return updatedMeal;
    } catch (error) {
      throw error;
    }
  };

  const deleteOneMeal = (mealId: string) => {
    try {
      Meal.deleteOneMeal(mealId);
    } catch (error) {
      throw error;
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

export { MealService };
