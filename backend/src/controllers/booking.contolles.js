import { Booking } from "../models/booking.model.js";

const normalizeBooking = (booking) => {
  const rawStatus = booking.bookingStatus || booking.status || booking.paymentStatus || "pending";
  const status = String(rawStatus).charAt(0).toUpperCase() + String(rawStatus).slice(1);

  return {
    ...booking._doc,
    status,
    amount: booking.totalAmount ?? booking.amount,
    tripTitle: booking.tripTitle || booking.flight || "Trip booking",
    tripType: booking.tripType || "Flight",
    destination: booking.destination || booking.flight || "Unknown destination",
  };
};

const createbooking = async (req, res) => {
  try {
    const {
      flightId,
      passengers,
      tripTitle,
      tripType,
      destination,
      startDate,
      endDate,
      totalAmount,
      currency,
    } = req.body;
    const user = req.user.id;

    if (!flightId && !tripTitle) {
      return res.status(400).json({
        success: false,
        message: "Either flightId or tripTitle is required",
      });
    }

    const bookingPayload = {
      user,
      flight: flightId || tripTitle,
      passenger: Array.isArray(passengers) ? passengers : [{ FullName: 'Guest', age: 'N/A', gender: 'other' }],
      totalAmount: Number(totalAmount) || 12000,
      currency: currency || 'NPR',
      tripTitle: tripTitle || flightId,
      tripType: tripType || 'Flight',
      destination: destination || tripTitle || flightId,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      bookingStatus: 'confirmed',
      paymentStatus: 'paid',
    };

    const newbooking = await Booking.create(bookingPayload);

    res.status(201).json({
      success: true,
      message: 'Booking created Successfully',
      booking: normalizeBooking(newbooking),
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(bookings.map(normalizeBooking));
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch your bookings",
      error: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json(bookings.map(normalizeBooking));
  } catch (error) {
    res.status(500).json({
      message: "Unable to fetch bookings",
      error: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    booking.bookingStatus = "cancelled";
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully",
      booking: normalizeBooking(booking),
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to cancel booking",
      error: error.message,
    });
  }
};

export {
  createbooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
};