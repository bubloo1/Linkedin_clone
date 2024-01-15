import express  from 'express'
import * as profileCtrl from '../../controllers/profile/profileCtrl'
import checkToken from '../../middleware/auth/verifyJWT'
const profileRouter = express.Router()


profileRouter.post("/saveprofiledetails", checkToken ,profileCtrl.saveProfileDetailsCtrl)


module.exports = profileRouter