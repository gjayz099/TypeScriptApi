import express from 'express';
import { PostUserSignUp, PostUserLogin, GetAllUser, GetIdUser, DeleteIdUser } from '../controller/User';

const router = express.Router();

/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     tags: [User]
 *     summary: Signup a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *               FullName:
 *                 type: string
 *               Email:
 *                 type: string
 *               PasswordHash:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post('/signup', PostUserSignUp);


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     tags: [User]
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:  
 *                 type: string
 *               PasswordHash:  
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post('/login', PostUserLogin);




/**
 * @swagger
 * /api/user:
 *   get:
 *     tags: [User]
 *     summary: get all user
 *     requestBody:
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.get('/', GetAllUser);


/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     tags: [User]
 *     summary: get one user by ID
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
 *         description: User Get All successfully
 */
router.get('/:id', GetIdUser);


/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: delete one user by ID
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
 *         description: User Deleted successfully
 */
router.delete('/:id', DeleteIdUser);

export default router;
