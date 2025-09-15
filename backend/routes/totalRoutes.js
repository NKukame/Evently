import express from 'express';
import signUp from '../controllers/SignUpController.js';
import logIn from '../controllers/LoginController.js';
import addEventController from '../controllers/AddEventController.js';
import getEventsController from '../controllers/GetEventsController.js';
import getEventController from '../controllers/GetSingleEventController.js';
import createBooking from '../controllers/BookingController.js';
import { checkBookingStatus, deleteBooking, getUserBookings } from '../controllers/BookingController.js';

const totalRoutes = express.Router();

totalRoutes.post("/login", logIn);

totalRoutes.post("/register", signUp);

totalRoutes.post("/events", addEventController);

totalRoutes.get("/events", getEventsController);

totalRoutes.get("/events/:id", getEventController);

totalRoutes.post("/bookings", createBooking);

totalRoutes.get("/bookings/:eventId", checkBookingStatus);

totalRoutes.delete("/bookings/:eventId", deleteBooking);

totalRoutes.get("/my-bookings", getUserBookings);



export default totalRoutes;