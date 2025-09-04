import express from 'express';
import signUp from '../controllers/SignUpController';

const totalRoutes = express.Router();

totalRoutes.post("register", signUp);


export default totalRoutes;