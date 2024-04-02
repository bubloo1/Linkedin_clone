import  express  from "express";
import { RowDataPacket } from 'mysql2'
import * as chatMdl from '../../models/chat/chatMdl'


export async function getprofiledetailsCtrl(req:express.Request,res:express.Response){
   try{

    let create_post: RowDataPacket = await chatMdl.getprofiledetailsMdl(req.user.user_id)
    return res.status(200).json({ message: create_post });

   }catch(error:any){
    throw new Error(error);
   }
}