import express from 'express';
import { PostPassenger, GetAllPassenger, GetIdPassenger } from '../controller/Passenger';

const router = express.Router();

/**
 * @swagger
 * /api/passenger/:
 *   post:
 *     tags: [Passenger]
 *     summary: Create a new passenger
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *               LastName:
 *                 type: string
 *               MiddleName:
 *                 type: string
 *               DateOfBirth:
 *                 type: string
 *                 format: date
 *               Gender:
 *                 type: string
 *               Nationality:
 *                 type: string
 *               Email:
 *                 type: string
 *               PhoneNumber:
 *                 type: string
 *     responses:
 *       201:
 *         description: Passenger created successfully
 */

router.post('/', PostPassenger)



/**
 * @swagger
 * /api/passenger/:
 *   get:
 *     tags: [Passenger]
 *     summary: get all assenger
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Passenger Get All successfully
 */
router.get('/', GetAllPassenger);



/**
 * @swagger
 * /api/passenger/{id}:
 *   get:
 *     tags: [Passenger]
 *     summary: get all assenger
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
 *         description: Passenger Get One successfully
 */
router.get('/:id', GetIdPassenger);




export default router