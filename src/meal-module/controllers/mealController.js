// res.status(400).json({error:""})
// res.json({meals: allMeals})

import * as MealService from "../service/mealService.js";

const getAllMeals = (req, res) => {
  const { name } = req.query;
  try {
    const allMeals = MealService.getAllMeals({ name });
    res.send({ status: "OK", data: allMeals });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneMeal = (req, res) => {
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
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewMeal = (req, res) => {
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
          "One of the following keys is missing or is empty in request body: 'name', 'ingredients', 'recipe', 'portions'",
      },
    });
    return;
  }
  const newMeal = {
    name: body.name,
    ingredients: body.ingredient,
    recipe: body.recipe,
    portions: body.portions,
  };
  try {
    const createdMeal = MealService.createNewMeal(newMeal);
    res.status(201).send({ status: "OK", data: createdMeal });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneMeal = (req, res) => {
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
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneMeal = (req, res) => {
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
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};


export {
  getAllMeals,
  getOneMeal,
  createNewMeal,
  updateOneMeal,
  deleteOneMeal,
};
