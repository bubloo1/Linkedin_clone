import express  from 'express'
import * as profileCtrl from '../../controllers/profile/profileCtrl'
import checkToken from '../../middleware/auth/verifyJWT'
const profileRouter = express.Router()


profileRouter.post("/saveprofiledetails", checkToken ,profileCtrl.saveProfileDetailsCtrl)
profileRouter.post("/profileimageupload", profileCtrl.upload.single('profile_image'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
})

module.exports = profileRouter