import express from 'express';
import { PostFlight, GetAllFlight, GetIdFlight, PutIdFlight, DeleteIdFlight} from '../controller/Flight'
import  authenticateToken from '../middleware/Middleware'
const router = express.Router();



/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *  /api/flight:
 *    post:
 *      tags: [Flight]
 *      summary: Create a new flight
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                FlightNumber:
 *                  type: string
 *                DepartureAirport:
 *                  type: string
 *                ArrivalAirport:
 *                  type: string
 *                FlightPrice:
 *                  type: number
 *                  format: float
 *                DepartureDate:
 *                  type: string
 *                  format: date
 *                DepartureTime:
 *                  type: string #12:30
 *                FlightDuration:
 *                  type: string 
 *                Airline:
 *                  type: string 
 *                PassengerCapacity:
 *                  type: integer
 *      responses:
 *        200:
 *          description: User created successfully
 */
router.post('/', PostFlight)

/**
 * @swagger
 * /api/flight/:
 *   get:
 *     tags: [Flight]
 *     summary: get all flight
 *     security:
 *       - BearerAuth: []  # This indicates that BearerAuth is required for this endpoint
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Flight Get All successfully
 */
router.get('/', authenticateToken,  GetAllFlight);


/**
 * @swagger
 * /api/flight/{id}:
 *   get:
 *     tags: [Flight]
 *     summary: get one flight
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
 *         description: Flight Get All successfully
 */
router.get('/:id', GetIdFlight);


/**
 * @swagger
 * /api/flight/{id}:
 *   put:
 *     tags: [Flight]
 *     summary: put one flight
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the flight to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FlightNumber:
 *                 type: string
 *               DepartureAirport:
 *                 type: string
 *               ArrivalAirport:
 *                 type: string
 *               FlightPrice:
 *                 type: number
 *                 format: float
 *               DepartureDateTime:
 *                 type: string
 *                 format: date-time
 *               ArrivalDateTime:
 *                 type: string
 *                 format: date-time
 *               FlightDuration:
 *                 type: string
 *               Airline:
 *                 type: string
 *               PassengerCapacity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Successfully updated flight
 */
router.put('/:id', PutIdFlight)


/**
 * @swagger
 * /api/flight/{id}:
 *   delete:
 *     tags: [Flight]
 *     summary: delete one flight
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
 *         description: Flight Delete One successfully
 */
router.delete('/:id', DeleteIdFlight);


export default router