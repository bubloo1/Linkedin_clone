import express  from 'express'
import * as profileCtrl from '../../controllers/profile/profileCtrl'
import checkToken from '../../middleware/auth/verifyJWT'
const profileRouter = express.Router()


profileRouter.post("/saveprofiledetails", checkToken ,profileCtrl.saveProfileDetailsCtrl)
profileRouter.post("/profileimageupload",  checkToken, profileCtrl.upload.single('profile_image'), profileCtrl.saveProfileUrl)
profileRouter.get("/getprofiledetails/:id", checkToken ,profileCtrl.getProfileDetailsCtrl)
profileRouter.get("/getallprofiledetails", checkToken ,profileCtrl.getAllProfileDetailsCtrl)
profileRouter.post("/sendconnectiondetails", checkToken ,profileCtrl.saveConnectionDetailsCtrl)
profileRouter.get("/getnotificationdetails", checkToken ,profileCtrl.getNotificationDetailsCtrl)
profileRouter.get("/getnotifications", checkToken ,profileCtrl.getNotificationConnectionDetailsCtrl)
profileRouter.get("/updateconnectionstatus/:id", checkToken ,profileCtrl.updateConnectionStatusCtrl)
profileRouter.post("/getconnectionCount", checkToken ,profileCtrl.connectionCountCtrl)
profileRouter.post("/usernames", checkToken ,profileCtrl.searchUsersCtrl)

module.exports = profileRouter