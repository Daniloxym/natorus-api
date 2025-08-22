import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name! ']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email! '],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email! ']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password! '],
    minlength: [8, 'Password must be at least 8 characters long! '],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password! '],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same! '
    }
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user'
  },
  photo: {
    type: String
  },
  passwordChangedAt: {
    type: Date
  }
});

userSchema.pre('save', async function (next) {
  // Hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined; // Remove passwordConfirm field

  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTimestamp < changedTimestamp;
  }

  // False for users who have not changed their password
  return false;
};

const User = mongoose.model('User', userSchema);

export default User;
