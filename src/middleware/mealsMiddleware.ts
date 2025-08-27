import { readFileSync } from "fs";
import { join } from "path";

const mealsData = readFileSync(join(__dirname, "../data/meals.json"), "utf-8");
const mealsJson = JSON.parse(mealsData);

const ingredientsData = readFileSync(
  join(__dirname, "../data/ingredients.json"),
  "utf-8"
);
const ingredientsJson = JSON.parse(ingredientsData);

const getIngredientsInfo = (
  ingredientsList: MealIngredients[]
): MealIngredient[] => {
  if (!ingredientsList) {
    return [];
  }

  const ingredients: MealIngredient[] = [];
  ingredientsList.forEach((ingredient: MealIngredients) => {
    const ingredientData = ingredientsJson.ingredients.find(
      (data: Ingredient) => data.id === ingredient.id
    );
    if (ingredientData) {
      ingredients.push({ ...ingredientData, qty: ingredient.qty});
    }
  });

  return ingredients;
};

export const getAllMeals = () => {
  return mealsJson.meals as ResponseMeals;
};

export const getMealByID = (id: string) => {
  const meal = mealsJson.meals.find((meal: Meal) => meal.id === id);
  return { ...meal, ingredients: getIngredientsInfo(meal.ingredients)} as Meal;
};
