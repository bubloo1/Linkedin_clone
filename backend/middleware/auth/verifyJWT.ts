import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import generateNewToken from './jwtValidator'

export default async function verifyAccessToken  (req: express.Request, res: express.Response, next: express.NextFunction)  {

    let token: any = req.headers['authorization'];

    token = (token.split(" "))[1]
    if (!token) {
      return res.status(401).json({ message: 'Access denied. Token not provided.' });
    }
  
    try {
      
      jwt.verify(token, 'personal_project',async (error: any, decoded: any) => {
        if(error){
          if(error.name === 'TokenExpiredError'){
           try{
            let newToken: any = await generateNewToken(token,res)

            if (newToken === 0) return res.status(401).json({ message: "UnAuthorized access" });
    
            res.setHeader('authorization',newToken)
          
            next()
           }catch(generateTokenError){
            console.error('Error generating new token:', generateTokenError);
            return res.status(500).json({ message: 'Internal Server Error' });
           }
          }
        }else{
          req.body.decoded_usr_details = decoded.find_user
          next()
        }
       
        
      }) 
    } catch (error) {
      console.log(error,"Error")
      return res.status(401).json({ message: 'Invalid token.' });
    }
  };