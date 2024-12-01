import express from 'express';
import {PostBaggageWithParamsIdBooking, GetAllBaggage, GetIdBaggage } from '../controller/Baggage';

const router = express.Router();



/**
 * @swagger
 * /api/baggage/{bookingId}:
 *   post:
 *     tags: [Baggage]
 *     summary: Create a new baggage
 *     parameters:
 *       - in: path
 *         name: bookingId
 *         required: true
 *         description: The ID of the booking to create baggage
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               BaggageType:
 *                 type: string
 *               Weight:
 *                 type: number
 *                 format: float
 *               BaggageAllowance:
 *                 type: number
 *                 format: float
 *               ExcessWeight:
 *                 type: number
 *                 format: float
 *               BaggagePrice:
 *                 type: number
 *                 format: float
 *               BaggageClaimLocation:
 *                 type: string 
 *     responses:
 *       200:
 *         description: Baggage created successfully
 */

router.post('/:bookingId', PostBaggageWithParamsIdBooking)



/**
 * @swagger
 * /api/baggage/:
 *   get:
 *     tags: [Baggage]
 *     summary: get all baggage
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Baggage Get All successfully
 */
router.get('/', GetAllBaggage);


/**
 * @swagger
 * /api/baggage/{id}:
 *   get:
 *     tags: [Baggage]
 *     summary: get one baggage
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
 *         description: Baggage Get one successfully
 */
router.get('/:id', GetIdBaggage)



export default router