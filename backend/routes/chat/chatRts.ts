import express  from "express";
import * as chatCtrl from '../../controllers/chat/chatCtrl'
import checkToken from '../../middleware/auth/verifyJWT'

const chatRouter = express.Router()

chatRouter.get("/getchatdetails", checkToken, chatCtrl.getprofiledetailsCtrl)


module.exports = chatRouter