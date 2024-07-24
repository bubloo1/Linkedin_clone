import  express  from "express";
import { RowDataPacket } from 'mysql2'
import * as postMdl from '../../models/post/postMdl'
import multer from "multer";
import * as authMdl from '../../models/auth/authMdl'

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
    let combinedData:any;
    let show_post = await postMdl.postCollection.find().lean().exec()
    const userDetails = await authMdl.userCollection.findOne({user_id:req.user.user_id}).lean().exec()
   
    const newPost = show_post[0]

    console.log(userDetails, "userDetails");
    console.log(show_post[0], "showPost");

    if(show_post[0]){
      combinedData = { ...newPost, ...userDetails };
    }
    
    console.log("combined Object",combinedData,"combainedObject")
    return res.status(200).json({ message: [combinedData] });
}


export async function postController(req:express.Request,res:express.Response){
    // const {post} = req.body.post
    console.log(req.body.post,"new post")
    let postLikesDetails: RowDataPacket = await postMdl.postCollection.create({user_post:req.body.post,user_id:req.user.user_id,post_url:req.file?.path})
    console.log(postLikesDetails,"postLikesDetails")
    return res.status(200).json({ message: postLikesDetails });
}

export async function postLikesCtrl(req:express.Request,res:express.Response){
    const postID = req.body.postID
    let updatepostDetails 
    console.log(postID,"new post")
    let postDetails = await postMdl.postCollection.findOne({post_id: postID})
    console.log(postDetails,"postDetails")
    if(postDetails.post_like === 0){
      updatepostDetails = await postMdl.postCollection.updateOne({post_id:postID},{post_like:1,post_like_count:postDetails.post_like_count + 1})
    }else{
      updatepostDetails = await postMdl.postCollection.updateOne({post_id:postID},{post_like:0,post_like_count:postDetails.post_like_count - 1})
    } 
    return res.status(200).json({ message: updatepostDetails });
}

export async function postCommentCtrl(req:express.Request,res:express.Response){
  const {addComment,postID} = req.body
  console.log(addComment,postID,"new post")
  let postLikesDetails: RowDataPacket = await postMdl.commentCollection.create({comment:addComment,post_id:postID})
  console.log(postLikesDetails,"postLikesDetails")
  return res.status(200).json({ message: postLikesDetails });
}

export async function sendCommentCtrl(req:express.Request,res:express.Response){
  const {postID} = req.body
  console.log(postID,"new post")
  let postLikesDetails = await postMdl.commentCollection.find({post_id:postID})
  console.log(postLikesDetails,"postLikesDetails")
  return res.status(200).json({ message: postLikesDetails });
}
