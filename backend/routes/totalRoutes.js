import express from 'express';
import signUp from '../controllers/SignUpController.js';
import logIn from '../controllers/LoginController.js';

const totalRoutes = express.Router();

totalRoutes.post("/login", logIn);

totalRoutes.post("/register", signUp);


export default totalRoutes;