import  express  from "express";
import { RowDataPacket } from 'mysql2'
import * as profileMdl from '../../models/profile/profileMdl'

export async function saveProfileDetailsCtrl(req:express.Request,res:express.Response){
    // const {post} = req.body
    try{
        console.log(req.body,"body")
        let create_post: RowDataPacket = await profileMdl.saveProfileDetailsMdl(req.body)
        console.log(create_post,"create post")
        return res.status(200).json({ message: create_post });
    }catch(error){
        console.log(error,"Error")
        throw error
    }
}
