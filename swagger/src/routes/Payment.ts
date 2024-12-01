import express from 'express';
import { PostBaggageWithParamsIdBooking} from '../controller/Payment';

const router = express.Router();



/**
 * @swagger
 * /api/payment/{bookingId}:
 *   post:
 *     tags: [Payment]
 *     summary: Create a new payment
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: The ID of the booking to create payment
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Amount:
 *                 type: number
 *                 format: float
 *               PaymentMethod:
 *                 type: string
 *               PaymentStatus:
 *                 type: string
 *               PaymentDate:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Payment created successfully
 */

router.post('/:bookingId', PostBaggageWithParamsIdBooking)


export default router