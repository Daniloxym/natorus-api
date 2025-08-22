import User from '../models/userModel.js';
import { APIFeatures } from '../utils/apiFeatures.js';
import { catchAsync } from '../utils/catchAsync.js';
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

export const getUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not yet implemented!' });
};

export const updateUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not yet implemented!' });
};

export const deleteUser = (req, res) => {
  res.status(500).json({ status: 'error', message: 'This route is not yet implemented!' });
};
