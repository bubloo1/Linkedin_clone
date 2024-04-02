import express  from "express";
import * as postCtrl from '../../controllers/post//postCtrl'
import checkToken from '../../middleware/auth/verifyJWT'

const postRouter = express.Router()

postRouter.post("/savepost", checkToken, postCtrl.upload.single('post_image'), postCtrl.postController)
postRouter.get("/showposts", checkToken, postCtrl.sendPosts)
postRouter.post("/updatepostlikes", checkToken, postCtrl.postLikesCtrl)
postRouter.post("/savecomment", checkToken, postCtrl.postCommentCtrl)
postRouter.post("/getcomments", checkToken, postCtrl.sendCommentCtrl)



module.exports = postRouter