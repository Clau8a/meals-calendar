import DB from "./db.json";
import { saveToDatabase } from "./utils";
import { BaseMealDto, FilterParams, MealDto } from "../meal-module/meals";

const getAllMeals = (filterParams: FilterParams) => {
  try {
    if (filterParams.name) {
      const filteredMeals = DB.meals.filter((meal: MealDto) =>
        meal.name.toLocaleLowerCase().includes(filterParams.name)
      );
      return filteredMeals;
    }
    return DB.meals;
  } catch (error: any) {
    throw { status: 500, message: error };
  }
};

const getOneMeal = (mealId: string) => {
  try {
    const meal = DB.meals.find((meal) => meal.id === mealId);
    if (!meal) {
      throw {
        status: 400,
        message: `Can't find meal with the id '${mealId}'`,
      };
    }
    return meal;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewMeal = (newMeal: MealDto) => {
  try {
    const isAlreadyAdded =
      DB.meals.findIndex((meal) => meal.name === newMeal.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Meal with the name '${newMeal.name}' already exists`,
      };
    }
    DB.meals.push(newMeal);
    saveToDatabase(DB);
    return newMeal;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneMeal = (mealId: string, changes: BaseMealDto) => {
  try {
    const isAlreadyAdded =
      DB.meals.findIndex((meal) => meal.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Meal with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.meals.findIndex((meal) => meal.id === mealId);
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find meal with the id '${mealId}'`,
      };
    }
    const updatedMeal = {
      ...DB.meals[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.meals[indexForUpdate] = updatedMeal;
    saveToDatabase(DB);
    return updatedMeal;
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneMeal = (mealId: string) => {
  try {
    const indexForDeletion = DB.meals.findIndex((meal) => meal.id === mealId);
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find meal with the id '${mealId}'`,
      };
    }
    DB.meals.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error: any) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export { getAllMeals, createNewMeal, getOneMeal, updateOneMeal, deleteOneMeal };
