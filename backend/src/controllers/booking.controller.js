import { Booking } from '../models/booking.model.js';
import { User } from '../models/user.model.js';

export const createBooking = async (req, res) => {
  try {
    const { tripTitle, tripType, destination, startDate, endDate, amount, status } = req.body;

    if (!tripTitle || !destination || !startDate || !endDate || !amount) {
      return res.status(400).json({ message: 'Missing required booking fields' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      userName: user.username,
      tripTitle,
      tripType: tripType || 'Flight + Stay',
      destination,
      startDate,
      endDate,
      amount,
      status: status || 'Pending',
    });

    return res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).populate('user', 'username email role');
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
