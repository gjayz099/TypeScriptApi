import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/User';
const SECRET_KEY = 'RANDOM-TOKEN'; 


declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ message: 'Token required' });
    return; 
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Token is invalid or expired' });
      return; 
    }
    
    const user = decoded as User;
  
    req.user = user;
      

    next();
  });
};


export default authenticateToken
