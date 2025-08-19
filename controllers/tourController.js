import { Tour } from '../models/tourModel.js';
import qs from 'qs';
export const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create({
      ...req.body
    });
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
export const getAllTours = async (req, res) => {
  try {
    // 1. Filtering
    const queryObject = qs.parse(req.query);
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((field) => delete queryObject[field]);

    // 2. Advanced filtering
    let queryString = JSON.stringify(queryObject);

    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryString));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    // 3) Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination
    if (req.query.page) {
      const page = req.query.page * 1 || 1;
      const limit = req.query.limit * 1 || 100;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
export const getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({
        status: 'fail',
        message: 'Tour not found'
      });
    }
    res.status(200).json({
      status: 'success',
      data: { tour }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (tour) {
      res.status(200).json({
        status: 'success',
        data: { tour }
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Tour not found'
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
export const deleteTour = async (req, res) => {
  const tour = await Tour.findByIdAndDelete(req.params.id);

  try {
    if (tour) {
      res.status(204).json({
        status: 'success',
        data: null
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Tour not found'
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};
