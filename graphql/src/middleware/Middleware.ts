import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define the structure of the `user` object that you expect in the token
interface User {
  id: string;
  username: string;

}

// Extend the Express Request interface to include the `user` property
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const SECRET_KEY = 'your-secret-key'; // Replace with your actual secret key

// Middleware function to authenticate JWT
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }

    // Decode the token and attach the user information to the request object
    const user = decodedToken as User; // Cast the decoded token to the User type
    req.user = user; // Attach the decoded user info to the request object
    next(); // Allow the request to continue to the next middleware or resolver
  });
}

export default authenticateToken;
