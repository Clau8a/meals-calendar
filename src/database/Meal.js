import DB from "./db.js" ;
import { saveToDatabase } from "./utils.js";

const getAllMeals = (filterParams) => {
  try {
    if (filterParams.name) {
      const filteredMeals = DB.meals.filter((meal) =>
        meal.name.toLocaleLowerCase().includes(filterParams.name)
      );
      return filteredMeals;
    }
    return DB.meals;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneMeal = (mealId) => {
  try {
    const meal = DB.meals.find((meal) => meal.id === mealId);
    if (!meal) {
      throw {
        status: 400,
        message: `Can't find meal with the id '${mealId}'`,
      };
    }
    return meal;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewMeal = (newMeal) => {
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
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const updateOneMeal = (mealId, changes) => {
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
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneMeal = (mealId) => {
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
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

export { getAllMeals, createNewMeal, getOneMeal, updateOneMeal, deleteOneMeal };
