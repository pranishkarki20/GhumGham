import { Router } from 'express';
import auth from '../middleware/auth.js';
import { createBooking, getAllBookings, getUserBookings } from '../controllers/booking.controller.js';

const router = Router();

router.route('/').post(auth, createBooking);
router.route('/all').get(auth, getAllBookings);
router.route('/me').get(auth, getUserBookings);

export default router;
