import express from 'express';
import { PostBookingWithParamsIdFlight, GetAllBooking, GetIdBooking } from '../controller/Booking';

const router = express.Router();




/**
 * @swagger
 * /api/booking/{flightId}:
 *   post:
 *     tags: [Booking]
 *     summary: Create a new booking
 *     parameters:
 *       - in: path
 *         name: flightId
 *         required: true
 *         description: The ID of the flight to create booking
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               PassengerID:
 *                 type: string
 *               BookingDate:
 *                 type: string
 *                 format: date
 *               DepartureDateTime:
 *                 type: string
 *                 format: date-time
 *               ArrivalDateTime:
 *                 type: string
 *                 format: date-time
 *               SeatClass:
 *                 type: string
 *               SeatPreference:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Booking created successfully
 */

router.post('/:flightId', PostBookingWithParamsIdFlight)



/**
 * @swagger
 * /api/booking/:
 *   get:
 *     tags: [Booking]
 *     summary: get all booking
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: booking Get All successfully
 */
router.get('/', GetAllBooking);



/**
 * @swagger
 * /api/booking/{id}:
 *   get:
 *     tags: [Booking]
 *     summary: get one booking
 *     requestBody:
 *       content:
 *         application/json:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking Get All successfully
 */
router.get('/:id', GetIdBooking)



export default router