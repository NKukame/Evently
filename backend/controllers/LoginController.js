import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

/**
 * Handles a login request.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * 
 * @returns {Promise<void>}
 * 
 * @throws {Error} 400 - If the email or password is missing.
 * @throws {Error} 401 - If the email or password is invalid.
 * @throws {Error} 500 - If there is an internal server error.
 */
export default async function logIn(req, res){

    const { email, password } = req.body;

    if(!email || !password){
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try{
        const user = await prisma.user.findUnique({
            where: { 
                email : email,
            }
        })

        if(!user){
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
          return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user.id, email: user.email, name: user.name, isAdmin: user.isAdmin }
        });

    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error.' });
    } finally {
        await prisma.$disconnect();
    }
}