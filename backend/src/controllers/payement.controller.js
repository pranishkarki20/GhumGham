import stripe from "../config/stripe.js";
import { Booking } from "../models/booking.model.js";
import { Payment } from "../models/payment.model.js";
import mongoose from "mongoose";

const createCheckoutSession = async (req, res) => {
    try {
        const { bookingId } = req.body;

        if (!bookingId) {
            return res.status(400).json({
                success: false,
                message: "Booking ID is required."
            });
        }

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid Booking ID format."
            });
        }

        // Find booking
        const booking = await Booking.findById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found."
            });
        }

        // Check if already paid
        if (booking.paymentStatus === "paid") {
            return res.status(400).json({
                success: false,
                message: "Booking has already been paid."
            });
        }

        // Create payment record
        const payment = await Payment.create({
            booking: booking._id,
            user: booking.user,
            amount: booking.totalAmount,
            currency: "NPR",
            gateway: "stripe",
            paymentStatus: "pending",
            paymentMethod: "card"
        });

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {
                        currency: "usd", // Use a Stripe-supported currency while testing
                        product_data: {
                            name: "GhumGham Flight Booking",
                            description: `Booking ID: ${booking._id}`
                        },

                        // Stripe expects the smallest currency unit.
                        // For USD, convert dollars to cents.
                        unit_amount: booking.totalAmount * 100
                    },

                    quantity: 1
                }
            ],

            mode: "payment",

            success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

            cancel_url: `${process.env.CLIENT_URL}/payment/cancel`
        });

        // Save Stripe Session ID
        payment.stripeSessionId = session.id;
        await payment.save();

        res.status(200).json({
            success: true,
            message: "Checkout session created successfully.",
            sessionId: session.id,
            url: session.url
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export {
    createCheckoutSession
};