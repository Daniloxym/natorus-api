import { Router } from 'express';
import { protect, restrictTo } from '../controllers/authController.js';
import {
  createTour,
  getAllTours,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} from '../controllers/tourController.js';
export const toursRouter = Router();

toursRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours); // Example route for top 5 cheap tours
toursRouter.route('/tour-stats').get(getTourStats);
toursRouter.route('/monthly-plan/:year').get(getMonthlyPlan);
toursRouter.route('/').get(protect, getAllTours).post(createTour);
toursRouter.route('/:id').get(getTour).patch(updateTour).delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);
