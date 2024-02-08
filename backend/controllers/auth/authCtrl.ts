
import express from 'express';
import mysql, { RowDataPacket } from 'mysql2'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as authMdl from '../../models/auth/authMdl'


export async function signupController(req:express.Request,res:express.Response){
    
    const {email, password} = req.body
    try{
       
        if(!email || !password){
            return res.status(400).json({message: "Enter username and password"})
        }
        let result:  RowDataPacket = await authMdl.signupCheckDuplicateMdl(email)
        
        if(result.length > 0){
            return res.status(201).json({message: "duplicate user", duplicate: true })
        }   
        const hashedPassword: string = await bcrypt.hash(password,10)
       
        let create_user: RowDataPacket = await authMdl.createUserMdl(`${email}`,email,hashedPassword)
     
        const token = jwt.sign({email: email, user_id: create_user.insertId},"personal_project",{expiresIn: '1d'})
        
        const saveToken : RowDataPacket = await authMdl.saveTokenMdl(token, create_user.insertId)
        // res.cookie('jwt', token, {httpOnly: true,secure: true, maxAge: 24 * 60 * 60 * 1000});
        return res.status(200).json({message: create_user,token: token})
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export async function loginController(req:express.Request,res:express.Response){
    try{
        console.log("in login ctrl", req.body)
    
        const {username,password} = req.body
       
        if(!username || !password){
            return res.status(400).json({message: "Enter username and password"})
        }
       
        let find_user:  RowDataPacket = await authMdl.loginMdl(username)
        console.log(find_user,"find_user")
        if(!find_user[0]) return  res.status(201).json({ message: "Invalid credentials" });
        console.log(find_user[0].user_password,"find_user[0].user_password")
        const hashedPasswordMatch = await bcrypt.compare(password,find_user[0].user_password)
        console.log(hashedPasswordMatch,"hasshj")
        if (hashedPasswordMatch) {
            console.log("in login successfull")
            const token = jwt.sign({email: find_user[0].user_email, user_id: find_user[0].user_id},"personal_project",{expiresIn: '1d'})
            const saveToken : RowDataPacket = await authMdl.saveTokenMdl(token, find_user[0].user_id)
            // res.cookie('jwt', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            return res.status(200).json({ message: "Login successful", token: token});
          } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}




