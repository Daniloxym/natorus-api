import { Router } from 'express';
import { signup, login } from '../controllers/authController.js';

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

export const usersRouter = Router();

usersRouter.post('/signup', signup);
usersRouter.post('/login', login);

usersRouter.route('/').get(getAllUsers).post(createUser);
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
