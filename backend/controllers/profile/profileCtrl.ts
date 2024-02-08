import  express  from "express";
import { RowDataPacket } from 'mysql2'
import * as profileMdl from '../../models/profile/profileMdl'
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
