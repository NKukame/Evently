// backend/controllers/GetEventController.js
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export default async function getEventController(req, res) {
    const { id } = req.params;
    
    try {
        const event = await prisma.event.findUnique({
            where: { id: id }
        });
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }
        
        res.status(200).json(event);
    } catch (error) {
        console.error('Get event error:', error);
        res.status(500).json({ message: 'Failed to fetch event' });
    } finally {
        await prisma.$disconnect();
    }
}
