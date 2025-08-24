import User from '../models/userModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import { AppError } from '../utils/appError.js';

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (allowedFields.includes(key)) newObj[key] = obj[key];
  });
  return newObj;
};

export const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
});
export const createUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not yet implemented!' });
};

export const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

export const getUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not yet implemented!' });
};

export const updateUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not yet implemented!' });
};

export const deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not yet implemented!' });
};

export const updateMe = catchAsync(async (req, res, next) => {
  if (!req.body.email && !req.body.name) {
    return next(new AppError('Please provide email or name to update!', 400));
  }
  const filteredBody = filterObj(req.body, 'name', 'email');
  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});
