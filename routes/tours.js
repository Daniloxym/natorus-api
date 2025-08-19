import { Router } from 'express';
import {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour
} from '../controllers/tourController.js';
export const toursRouter = Router();

toursRouter.route('/').get(getAllTours).post(createTour);
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);
