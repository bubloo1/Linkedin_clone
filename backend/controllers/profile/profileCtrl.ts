import  express  from "express";
import { RowDataPacket } from 'mysql2'
import * as profileMdl from '../../models/profile/profileMdl'
import multer  from 'multer'
import * as authMdl from '../../models/auth/authMdl'

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
    let saveUrl = await authMdl.userCollection.updateOne({user_id:req.user.user_id},{profile_url:req.file?.path})
    console.log(saveUrl,"saveUrl")
  }catch(error){
    throw error
  }
}

export async function saveProfileDetailsCtrl(req:express.Request,res:express.Response){
    // const {post} = req.body
    try{
        console.log(req.body,"body")
        const values: {[key:string]: string} = {};
        console.log(req.body,"profileDetails")
    
        Object.entries(req.body).forEach(([key, value]) => {
          if (value !== undefined) {
            switch (key) {
              case 'firstName':
                values.first_name = `${value}`;
                break;
              case 'lastName':
                values.last_name = `${value}`;
                break;
              case 'selectedPronouns':
                values.gender = `${value}`;
                break;
              case 'additionalName':
                values.additional_name = `${value}`;
                break;
              case 'headline':
                values.headline = `${value}`;
                break;
              case 'country':
                values.country = `${value}`;
                break;
              case 'city':
                values.city = `${value}`;
                break;
            }
          }
        });
        let create_post = await authMdl.userCollection.updateOne({user_id:req.user.user_id},values)
        console.log(values,"qry")
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
      let create_post = await authMdl.userCollection.findOne({user_id:req.user.user_id})
      console.log(create_post,"create post")
      return res.status(200).json({ message: create_post });
  }catch(error){
      console.log(error,"Error")
      throw error
  }
}

export async function getAllProfileDetailsCtrl(req:express.Request,res:express.Response){
  try{
      let getProfielDetails = await authMdl.userCollection.find({user_id: { $ne: req.user.user_id }})
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
      let getProfielDetails = await profileMdl.networkCollection.create({connection_from_id:connectionFrom,connection_to_id:connectionTo})
      console.log(getProfielDetails,"create post")
      return res.status(200).json({ message: getProfielDetails });
  }catch(error){
      throw error
  }
}


export async function getNotificationDetailsCtrl(req:express.Request,res:express.Response){
  try{
      let getProfielDetails = await profileMdl.networkCollection.countDocuments({connection_to_id:req.user.user_id})
      console.log(getProfielDetails,"create post")
      return res.status(200).json({ message: {notificationsCount:getProfielDetails} });
  }catch(error){
      throw error
  }
}

// export async function getNotificationConnectionDetailsCtrl(req:express.Request,res:express.Response){
//   try{
//     console.log(req.user.user_id,"req.user.user_id")
//       let getProfileConDetails = await profileMdl.networkCollection.find({connection_from_id:req.user.user_id}).lean().exec()
//       let getProfielDetails = await authMdl.userCollection.find({user_id:req.user.user_id}).lean().exec()
    
      
//       for(let eachObj in getProfileConDetails){
//         for(let eachProfileDetail in getProfielDetails){
//           eachObj.connection_from_id == eachProfileDetail.user_id 
//         }
//         // console.log(eachObj,"eachObj")
//       }

//       console.log(getProfileConDetails,"getProfileConDetails")
//       console.log(getProfielDetails,"getProfielDetails")
//       // console.log(getProfielConDetails,"newGetProfiel")
//       // const bothData = {...getProfielConDetails,...newGetProfielDetails}
//       // console.log(bothData,"getProfielDetails")

//       return res.status(200).json({ message: "fgfgfg" });
//   }catch(error){
//       throw error
//   }
// }

export async function getNotificationConnectionDetailsCtrl(req: express.Request, res: express.Response) {
  try {
    console.log(req.user.user_id, "req.user.user_id");

    let getProfileConDetails = await profileMdl.networkCollection.find({ connection_to_id: req.user.user_id }).lean().exec();
    let getProfileDetails = await authMdl.userCollection.find({ user_id: req.user.user_id }).lean().exec();

    let combinedDetails = [];

    for (let eachObj of getProfileConDetails) {
      for (let eachProfileDetail of getProfileDetails) {
        if (eachObj.connection_to_id === eachProfileDetail.user_id) {
          combinedDetails.push({
            ...eachObj,
            ...eachProfileDetail
          });
        }
      }
    }

    console.log(combinedDetails,"combinedDetails")
    return res.status(200).json({ message:combinedDetails });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateConnectionStatusCtrl(req:express.Request,res:express.Response){
  try{
      const { id } = req.params
      console.log(id,"id id id id did ")
      let getProfielDetails = await profileMdl.networkCollection.updateOne({connection_id:id},{connection_status:1})
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
      let getConnectionCount  = await profileMdl.networkCollection.countDocuments({connection_from_id:req.body.userID, connection_status:1}).lean().exec()
     
      return res.status(200).json({ message: {connectionCount:getConnectionCount} });
  }catch(error){
      throw error
  }
}