import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import sanitize from 'sanitize';
import xss from 'xss-clean';
import { toursRouter } from './routes/tours.js';
import { usersRouter } from './routes/users.js';
import { AppError } from './utils/appError.js';
import { handleError } from './controllers/errorController.js';

export const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use(helmet());
app.use('/api', limiter);
app.use(express.json());

// Data sanitization against NoSQL query injection

// app.use((req, res, next) => {
//   req.query = sanitize(req.query);
//   next();
// });

// Data sanitization against XSS

app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

app.use((req, res, next) => {
  next(new AppError('Not Found', 404));
});

app.use(handleError);
