import express  from "express";
import * as postCtrl from '../../controllers/post//postCtrl'
import checkToken from '../../middleware/auth/verifyJWT'

const postRouter = express.Router()

postRouter.post("/post", checkToken, postCtrl.postController)
postRouter.get("/showposts", postCtrl.sendPosts)


module.exports = postRouter