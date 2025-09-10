import { PrismaClient } from "../generated/prisma/index.js";
import bcrypt from "bcrypt";


const prisma = new PrismaClient(); 
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