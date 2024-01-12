import  express  from "express";
import '../../models/post/postMdl'
import { RowDataPacket } from 'mysql2'
import * as postMdl from '../../models/post/postMdl'

export async function sendPosts(req:express.Request,res:express.Response){
    let show_post: RowDataPacket[] = await postMdl.showPostMdl()
    console.log(show_post,"create post")
    return res.status(200).json({ message: show_post });
}
