export interface IngredientDto {
  id: string;
  name: string;
  measurement: number;
}

export interface Ingredient {
  id: string;
  quantity: number;
}

export interface BaseMealDto {
  name: string;
  ingredients: Array<Ingredient>;
  recipe: string;
  portions: number;
}

export interface MealDto extends BaseMealDto {
  id: string;
}

export interface FilterParams {
  name: string;
}

export interface MealService {
  getAllMeals({ name }: FilterParams): Array<MealDto>;
  getOneMeal(mealId: string): MealDto;
  createNewMeal(newMeal: BaseMealDto): MealDto;
  updateOneMeal(mealId: string, changes: BaseMealDto): MealDto;
  deleteOneMeal(mealId: string): void;
}
