import express from 'express';
import signUp from '../controllers/SignUpController.js';
import logIn from '../controllers/LoginController.js';
import addEventController from '../controllers/AddEventController.js';
import getEventsController from '../controllers/GetEventsController.js';
import getEventController from '../controllers/GetSingleEventController.js';

const totalRoutes = express.Router();

totalRoutes.post("/login", logIn);

totalRoutes.post("/register", signUp);

totalRoutes.post("/events", addEventController);

totalRoutes.get("/events", getEventsController);

totalRoutes.get("/events/:id", getEventController);



export default totalRoutes;