import { Router } from "express";
import { createbooking, getMyBookings, getAllBookings, cancelBooking } from "../controllers/booking.contolles.js";
import auth from "../middleware/auth.js";

const router = Router();

router.route('/cbooking').post(auth, createbooking);
router.route('/me').get(auth, getMyBookings);
router.route('/all').get(auth, getAllBookings);
router.route('/:id/cancel').patch(auth, cancelBooking);

export default router;