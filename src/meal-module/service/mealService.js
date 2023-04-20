import {v4 as uuid} from 'uuid';
import * as Meal from "../../database/Meal.js";

const getAllMeals = ({ name }) => {
  try {
    const allMeals = Meal.getAllMeals({ name });
    return allMeals;
  } catch (error) {
    throw error;
  }
};

const getOneMeal = (mealId) => {
  try {
    const meal = Meal.getOneMeal(mealId);
    return meal;
  } catch (error) {
    throw error;
  }
};

const createNewMeal = (newMeal) => {
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

const updateOneMeal = (mealId, changes) => {
  try {
    const updatedMeal = Meal.updateOneMeal(mealId, changes);
    return updatedMeal;
  } catch (error) {
    throw error;
  }
};

const deleteOneMeal = (mealId) => {
  try {
    Meal.deleteOneMeal(mealId);
  } catch (error) {
    throw error;
  }
};

export {
  getAllMeals,
  getOneMeal,
  createNewMeal,
  updateOneMeal,
  deleteOneMeal,
};
