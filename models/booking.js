const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  carPickupDate: {
    type: Date,
    required: true
  },
  pickupStatus: {
    type: String,
    enum: ['pending', 'done'],
    default: 'pending'
  },
  carNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending','done'],
    default: 'pending'
  }

});

module.exports.Booking= mongoose.model('Booking', bookingSchema);