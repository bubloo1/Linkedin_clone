
import * as dbutils from '../../config/dbConfig'
import { RowDataPacket } from 'mysql2'
import mongoose from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';

export const postSchema = new mongoose.Schema({
    post_id:{
        type: Number,
        unique: true
    },
    user_post:{
        type: String,
        required: true,
    },
    user_id: {
        type: Number,
        required: true,
    },
    post_url:{
        type: String,
        required: true,
    },
    created_on:{
        type: Date,
        default: Date.now
    },
    post_like:{
        type: Number,
        default: 0
        
    },
    post_like_count:{
        type: Number,
        default: 0
    },
 
})

postSchema.plugin(AutoIncrementID, { field: 'post_id' });

export const postCollection : mongoose.Model<any> = mongoose.model("Posts",postSchema)

export const postCommentsSchema = new mongoose.Schema({
    comment_id:{
        type: Number,
        unique: true
    },
    comment:{
        type: String,
    },
    post_id: {
        type: Number,
        required: true,
    },
    created_on:{
        type: Date,
        default: Date.now
    },
 
})

postCommentsSchema.plugin(AutoIncrementID, { field: 'comment_id' });

export const commentCollection : mongoose.Model<any> = mongoose.model("Comments",postCommentsSchema)

export async function showPostMdl(){
    const insertPost =  `select p.*, ud.first_name, ud.last_name, ud.user_bio, ud.profile_url from posts as p join user_details as ud on ud.user_id = p.user_id;`
    let result:  RowDataPacket = await dbutils.query_excution(insertPost)
    return result
}

export async function postLikesMdl(postID:number){
    const getPostDetails =  `select post_like, post_like_count from posts where post_id = ${postID}`
    let result:  RowDataPacket = await dbutils.query_excution(getPostDetails)
    return result
}

export async function postLikesUpdateMdl(postDetails:any,postID:number){
    let qry = ``
    if(postDetails.post_like === 0){
        qry = qry + `post_like = 1, post_like_count = ${postDetails.post_like_count + 1}`
    }else{
        qry = qry + `post_like = 0, post_like_count = ${postDetails.post_like_count - 1}`
    }
    const getPostDetails =  `update posts set ${qry} where post_id = ${postID}`
    let result:  RowDataPacket = await dbutils.query_excution(getPostDetails)
    return result
}

export async function postMdl(post:string, path:string | undefined, user:{user_id:number}){
    let qry: string = ``
    if(path){
        path = path?.replace(/\\/gi,"/")
        qry = `post_url= '${path}',`
    }
    const insertPost =  `insert into posts set user_post = '${post}', user_id = ${user.user_id}, ${qry}
    created_on = CURRENT_TIMESTAMP()`
    let result:  RowDataPacket = await dbutils.query_excution(insertPost)
    return result

}


export async function postCommentMdl(comment:string,postID:number){
    const getPostDetails =  `insert into post_comments set created_on = CURRENT_TIMESTAMP(), comment = '${comment}', post_id = ${postID}`
    let result:  RowDataPacket = await dbutils.query_excution(getPostDetails)
    return result
}

export async function sendCommentMdl(postID:number){
    const getPostDetails =  `select comment,comment_id from post_comments where post_id = ${postID}`
    let result:  RowDataPacket = await dbutils.query_excution(getPostDetails)
    return result
}