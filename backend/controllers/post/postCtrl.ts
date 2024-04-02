import  express  from "express";
import { RowDataPacket } from 'mysql2'
import * as postMdl from '../../models/post/postMdl'
import multer from "multer";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/images'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique filename for the uploaded file
    },
  });



export const upload = multer({ storage: storage});

export async function sendPosts(req:express.Request,res:express.Response){
    let show_post: RowDataPacket = await postMdl.showPostMdl()
    console.log(res.getHeader('authorization'),"headeraaa")
    return res.status(200).json({ message: show_post });
}


export async function postController(req:express.Request,res:express.Response){
    // const {post} = req.body.post
    console.log(req.body.post,"new post")
    let postLikesDetails: RowDataPacket = await postMdl.postMdl(req.body.post, req.file?.path, req.user)
    console.log(postLikesDetails,"postLikesDetails")
    return res.status(200).json({ message: postLikesDetails });
}

export async function postLikesCtrl(req:express.Request,res:express.Response){
    const postID = req.body.postID
    console.log(postID,"new post")
    let postDetails: RowDataPacket = await postMdl.postLikesMdl(postID)
    console.log(postDetails)
    let updatepostDetails: RowDataPacket = await postMdl.postLikesUpdateMdl(postDetails[0],postID)
    return res.status(200).json({ message: updatepostDetails });
}

export async function postCommentCtrl(req:express.Request,res:express.Response){
  const {addComment,postID} = req.body
  console.log(addComment,postID,"new post")
  let postLikesDetails: RowDataPacket = await postMdl.postCommentMdl(addComment,postID)
  console.log(postLikesDetails,"postLikesDetails")
  return res.status(200).json({ message: postLikesDetails });
}

export async function sendCommentCtrl(req:express.Request,res:express.Response){
  const {postID} = req.body
  console.log(postID,"new post")
  let postLikesDetails: RowDataPacket = await postMdl.sendCommentMdl(postID)
  console.log(postLikesDetails,"postLikesDetails")
  return res.status(200).json({ message: postLikesDetails });
}
