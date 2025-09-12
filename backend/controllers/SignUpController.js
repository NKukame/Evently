import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";


const prisma = new PrismaClient(); 
/**
 * Handles the sign up of a user.
 * It first checks if the user with the given email already exists.
 * If the user does not exist, it hashes the password and creates a new user.
 * If the user already exists, it returns a 409 status code with a message saying that the user already exists.
 * If there is an error in the process, it returns a 400 status code with a message saying that the sign up failed.
 * After the process is complete, it disconnects from the database.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<void>} - A promise that resolves when the sign up is complete.
 */

export default async function signUp(req, res) {

    const { email, password, name } = req.body;

    try{

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser){
            return res.status(409).json({ message: 'User With This Email Already Exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: 'User registered successfully!', user: { id: newUser.id, email: newUser.email, username: newUser.username } });

    }catch(err){
        return res.status(400).send({message: "Sign Up Failed"})
    }finally {
        await prisma.$disconnect(); 
    }

}