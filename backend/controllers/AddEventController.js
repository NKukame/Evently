import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient(); 

export default async function addEventController(req, res){

    const { title, description, date, time, location, capacity, image } = req.body;

    try{
        const newEvent = await prisma.event.create({
            data: {
                title,
                description,
                date,
                time,
                location,
                capacity,
                image
            }
        });
        res.status(201).json({ message: 'Event added successfully!', event: newEvent });
    }catch(error){
        return res.status(400).send({message: "Adding Event Failed Failed"})
    }finally{
        prisma.$disconnect();
    }

}