// backend/controllers/GetEventsController.js
import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export default async function getEventsController(req, res) {
    try {
        const events = await prisma.event.findMany({
            orderBy: {
                date: 'asc'
            }
        });
        res.status(200).json(events);
    } catch (error) {
        console.error('Get events error:', error);
        res.status(500).json({ message: 'Failed to fetch events' });
    } finally {
        await prisma.$disconnect();
    }
}
