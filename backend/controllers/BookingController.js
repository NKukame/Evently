import { PrismaClient } from "../generated/prisma/index.js";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export default async function createBooking(req, res) {
    const { eventId } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Check if user already booked this event
        const existingBooking = await prisma.booking.findFirst({
            where: {
                userId: userId,
                eventId: eventId
            }
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'You have already booked this event' });
        }

        // Check event capacity
        const event = await prisma.event.findUnique({
            where: { id: eventId }
        });

        if (!event || event.capacity <= 0) {
            return res.status(400).json({ message: 'Event is fully booked' });
        }

        // Create booking and decrease capacity
        const [booking] = await prisma.$transaction([
            prisma.booking.create({
                data: {
                    userId: userId,
                    eventId: eventId
                }
            }),
            prisma.event.update({
                where: { id: eventId },
                data: { capacity: { decrement: 1 } }
            })
        ]);

        res.status(201).json({ message: 'Booking successful', booking });
    } catch (error) {
        console.error('Booking error:', error);
        res.status(500).json({ message: 'Booking failed' });
    } finally {
        await prisma.$disconnect();
    }
}

export async function checkBookingStatus(req, res) {
    const { eventId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const booking = await prisma.booking.findFirst({
            where: {
                userId: userId,
                eventId: eventId
            }
        });

        res.status(200).json({ isBooked: !!booking, booking });
    } catch (error) {
        console.error('Check booking error:', error);
        res.status(500).json({ message: 'Failed to check booking status' });
    } finally {
        await prisma.$disconnect();
    }
}

export async function deleteBooking(req, res) {
    const { eventId } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Delete booking and increase capacity
        await prisma.$transaction([
            prisma.booking.deleteMany({
                where: {
                    userId: userId,
                    eventId: eventId
                }
            }),
            prisma.event.update({
                where: { id: eventId },
                data: { capacity: { increment: 1 } }
            })
        ]);

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({ message: 'Failed to cancel booking' });
    } finally {
        await prisma.$disconnect();
    }
}

export async function getUserBookings(req, res) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const bookings = await prisma.booking.findMany({
            where: { userId: userId },
            include: { event: true }
        });

        const events = bookings.map(booking => booking.event);
        res.status(200).json(events);
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({ message: 'Failed to fetch bookings' });
    } finally {
        await prisma.$disconnect();
    }
}
