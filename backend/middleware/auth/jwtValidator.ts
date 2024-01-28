import jwt  from "jsonwebtoken";
import express  from "express";
import * as authMdl from '../../models/auth/authMdl'
import { RowDataPacket } from "mysql2";

export default async function generateNewToken(token: string, res: express.Response){
    let token_user: RowDataPacket = await authMdl.checkTokenMdl(token)
    console.log(token_user,"token_user")
    if(token_user.length == 0){
        // return res.status(401).json({ message: "UnAuthorized access" });
        return 0
    }
    const newToken = jwt.sign({email: token_user[0].user_email, user_id: token_user[0].user_id},"personal_project",{expiresIn: '15s'})
    let save_token: RowDataPacket = await authMdl.saveNewTokenMdl(newToken,token_user[0].user_id)
    return newToken
}