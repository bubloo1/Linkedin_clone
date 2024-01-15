
import express from 'express';
import mysql, { RowDataPacket } from 'mysql2'
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as authMdl from '../../models/auth/authMdl'
import multer  from 'multer'


// Set up multer storage and file filtering
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for the uploaded file
    },
  });



export const upload = multer({ storage: storage});


export async function signupController(req:express.Request,res:express.Response){
    
    const {email, password} = req.body
    try{
       
        if(!email || !password){
            return res.status(400).json({message: "Enter username and password"})
        }
        let result:  RowDataPacket[] = await authMdl.signupCheckDuplicateMdl(email)
        
        console.log(result,"result")
    
        if(result.length > 0){
            return res.status(201).json({message: "duplicate user", duplicate: true })
        }   
        const hashedPassword: string = await bcrypt.hash(password,10)
       
        let create_user: RowDataPacket[] = await authMdl.createUserMdl("random user",email,hashedPassword)
        
        const token = jwt.sign({email:email},"personal_project",{expiresIn: '1d'})
    
        return res.status(200).json({message: create_user,token: token})
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function loginController(req:express.Request,res:express.Response){
    try{
        type user = {
            user_password: string,
            user_email: string
        }
        const new_user: user = req.body
       
        if(!new_user.user_email || !new_user.user_password){
            return res.status(400).json({message: "Enter username and password"})
        }
       
        let find_user:  RowDataPacket[] = await authMdl.loginMdl(new_user)
        const hashedPasswordMatch = await bcrypt.compare(new_user.user_password,find_user[0].user_password)
    
        if (hashedPasswordMatch) {
            const token = jwt.sign({find_user},"personal_project",{expiresIn: '1d'})
            // res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            return res.status(200).json({ message: "Login successful", token: token});
          } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}




