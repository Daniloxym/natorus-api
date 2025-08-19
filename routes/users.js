import { Router } from 'express';

import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

export const usersRouter = Router();

usersRouter.route('/').get(getAllUsers).post(createUser);
usersRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
