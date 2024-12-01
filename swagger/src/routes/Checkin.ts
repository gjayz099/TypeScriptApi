import express from 'express';
import { PostCheckinWithParamsIdBooking, GetAllCheckin, GetIdCheckin } from '../controller/Checkin'

const router = express.Router();



/**
 * @swagger
 * /api/checkin/{bookingId}:
 *   post:
 *     tags: [Checkin]
 *     summary: Create a new checkin
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: The ID of the booking to create checkin
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               BoardingGate:
 *                 type: string
 *               BoardingTime:
 *                 type: string # 12:00
 *               SeatAssignment:
 *                 type: string
 *     responses:
 *       200:
 *         description: Baggage created successfully
 */

router.post('/:bookingId', PostCheckinWithParamsIdBooking)


/**
 * @swagger
 * /api/checkin/:
 *   get:
 *     tags: [Checkin]
 *     summary: get all checkin
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Checkin Get All successfully
 */
router.get('/', GetAllCheckin);


/**
 * @swagger
 * /api/checkin/{id}:
 *   get:
 *     tags: [Checkin]
 *     summary: get one checkin
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
 *         description: Checkin Get one successfully
 */
router.get('/:id', GetIdCheckin)




export default router