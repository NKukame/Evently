import express from 'express';
import signUp from '../controllers/SignUpController.js';

const totalRoutes = express.Router();

totalRoutes.post("/register", signUp);


export default totalRoutes;