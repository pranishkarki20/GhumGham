import mongoose, { Schema } from 'mongoose';

const bookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    tripTitle: {
      type: String,
      required: true,
      trim: true,
    },
    tripType: {
      type: String,
      enum: ['Flight', 'Stay', 'Flight + Stay'],
      default: 'Flight + Stay',
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model('Booking', bookingSchema);
