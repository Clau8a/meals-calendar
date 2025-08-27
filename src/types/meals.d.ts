type Units = "pza" | "g" | "kg" | "ml" | "l" | "lata";

interface Ingredient {
  id: string;
  name: string;
  unit: Units;
}

interface MealIngredient extends Ingredient {
  qty: number;
}

interface MealIngredients {
  id: string;
  qty: number;
}

interface ResponseMeal {
  id: string;
  name: string;
  ingredients: MealIngredients[];
  homePres: boolean;
}

type ResponseMeals = ResponseMeal[];

interface Meal extends ResponseMeal {
  ingredients: MealIngredient[];
}

type Meals = Meal[];
