import express, { Request, Response, NextFunction, Router } from 'express';
import { getAllMeals, getMealByID } from '../middleware/mealsMiddleware';

const router: Router = express.Router();

interface MealResponse extends Response {
  meal?: Meal;
}

// getting all meals
router.get('/', (req: Request, res: Response) => {
  res.send(getAllMeals());
});

// getting single meal
router.get('/:id', getSingleMealByID, (req: Request, res: MealResponse) => {
  res.send(res.meal);
});

// create single meal
// router.post('/', (req: Request, res: Response) => {
// });

// update single meal
// router.patch('/:id', (req: Request, res: Response) => {
// });

function getSingleMealByID(req: Request, res: MealResponse, next: NextFunction) {
  const meal = getMealByID(req.params.id);
  if (meal === null) {
    res.status(404).json({ message: 'Cannot find meal' });
    return;
  }

  res.meal = meal;
  next();
}

export default router;
