// models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  
  fullName: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
    unique: true, // Make sure email is unique
    match: [/\S+@\S+\.\S+/, 'is invalid'], // Email validation
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true, // Store a hashed password (never store plain-text)
  },
  businessType: {
    type: String,
    enum: ['Importer', 'Exporter', 'Both'],
    // required: true,
  },
  companyName: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    // required: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now, // Automatically sets the current timestamp
  },
  isActive: {
    type: Boolean,
    default: true, // Default is active
  },
});

// // Hash password before saving it to the database
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Compare entered password with hashed password in the DB
// userSchema.methods.comparePassword = async function (password) {
//   console.log(password,"MATCHING PASSWORD >>>>>>>>", this.password)
//   return await bcrypt.compare(password, this.password);
// };

const User = mongoose.model('User', userSchema);

module.exports = User;
