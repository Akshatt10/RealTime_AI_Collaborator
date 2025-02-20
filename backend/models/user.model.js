import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [6, 'Email must be at least 6 characters long'],
    maxLength: [50, 'Email cannot be more than 50 characters long'],
  },

  password: { 
    type: String,
  }
});


userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};