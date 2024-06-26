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

export async function saveProfileUrl(req:express.Request,res:express.Response) {
  try{
    console.log(req.user,"req.body")
    let saveUrl: RowDataPacket = await profileMdl.saveProfileUrlMdl(req.file?.path,req.user.user_id)
    console.log(saveUrl,"saveUrl")
  }catch(error){
    throw error
  }
}

export async function saveProfileDetailsCtrl(req:express.Request,res:express.Response){
    // const {post} = req.body
    try{
        console.log(req.body,"body")
        let create_post: RowDataPacket = await profileMdl.saveProfileDetailsMdl(req.body,req.user.user_id)
        console.log(create_post,"create post")
        return res.status(200).json({ message: create_post });
    }catch(error){
        console.log(error,"Error")
        throw error
    }
}

export async function getProfileDetailsCtrl(req:express.Request,res:express.Response){
  try{
      console.log(req.body,"body")
      let create_post: RowDataPacket = await profileMdl.getProfileDetailsMdl(req.user.user_id)
      console.log(create_post,"create post")
      return res.status(200).json({ message: create_post });
  }catch(error){
      console.log(error,"Error")
      throw error
  }
}

export async function getAllProfileDetailsCtrl(req:express.Request,res:express.Response){
  try{
      let getProfielDetails: RowDataPacket = await profileMdl.getAllProfileDetailsMdl(req.user.user_id)
      console.log(getProfielDetails,"create post")
      return res.status(200).json({ message: getProfielDetails });
  }catch(error){
      throw error
  }
}

export async function saveConnectionDetailsCtrl(req:express.Request,res:express.Response){
  try{
      const {connectionFrom,connectionTo} = req.body
      console.log(connectionFrom,connectionTo,"conection")
      let getProfielDetails: RowDataPacket = await profileMdl.saveConnectionDetailsMdl(connectionFrom,connectionTo)
      console.log(getProfielDetails,"create post")
      return res.status(200).json({ message: getProfielDetails });
  }catch(error){
      throw error
  }
}


export async function getNotificationDetailsCtrl(req:express.Request,res:express.Response){
  try{
      let getProfielDetails: RowDataPacket = await profileMdl.getNotificationDetailsMdl(req.user.user_id)
      console.log(getProfielDetails,"create post")
      return res.status(200).json({ message: getProfielDetails });
  }catch(error){
      throw error
  }
}

export async function getNotificationConnectionDetailsCtrl(req:express.Request,res:express.Response){
  try{
      let getProfielDetails: RowDataPacket = await profileMdl.getNotificationConnectionDetailsMdl(req.user.user_id)
      console.log(getProfielDetails,"getProfielDetails")
      return res.status(200).json({ message: getProfielDetails });
  }catch(error){
      throw error
  }
}

export async function updateConnectionStatusCtrl(req:express.Request,res:express.Response){
  try{
      const { id } = req.params
      console.log(id,"id id id id did ")
      let getProfielDetails: RowDataPacket = await profileMdl.updateConnectionStatusMdl(id)
      console.log(getProfielDetails,"getProfielDetails")
      return res.status(200).json({ message: getProfielDetails });
  }catch(error){
      throw error
  }
}

export async function connectionCountCtrl(req:express.Request,res:express.Response){
  try{
      // const { userID } = req.body.
      // console.log(userID,"id id id id did ")
      console.log(req.body,"dfiugfuigfjdgkfoigfoghfhg")
      let getConnectionCount: RowDataPacket = await profileMdl.connectionCountMdl(req.body.userID)
     
      return res.status(200).json({ message: getConnectionCount });
  }catch(error){
      throw error
  }
}