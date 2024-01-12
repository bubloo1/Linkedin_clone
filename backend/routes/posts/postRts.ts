import express  from "express";
import * as postCtrl from '../../controllers/post//postCtrl'


const postRouter = express.Router()

postRouter.get("/showposts", postCtrl.sendPosts)


module.exports = postRouter