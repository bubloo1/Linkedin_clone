import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export function verifyAccessToken  (req: express.Request, res: express.Response, next: express.NextFunction)  {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, 'personal_project') as JwtPayload; // Replace 'your-secret-key' with your actual secret key
      req.body.decoded_usr_details = decoded.find_user
      
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };