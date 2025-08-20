import express from 'express';
import { toursRouter } from './routes/tours.js';
import { usersRouter } from './routes/users.js';
import { AppError } from './utils/appError.js';
import { handleError } from './controllers/errorController.js';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.use((req, res, next) => {
  next(new AppError('Not Found', 404));
});

app.use(handleError);
