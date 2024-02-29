import express  from 'express'
import * as profileCtrl from '../../controllers/profile/profileCtrl'
import checkToken from '../../middleware/auth/verifyJWT'
const profileRouter = express.Router()


profileRouter.post("/saveprofiledetails", checkToken ,profileCtrl.saveProfileDetailsCtrl)
profileRouter.post("/profileimageupload",  checkToken, profileCtrl.upload.single('profile_image'), profileCtrl.saveProfileUrl)
profileRouter.get("/getprofiledetails", checkToken ,profileCtrl.getProfileDetailsCtrl)

module.exports = profileRouter