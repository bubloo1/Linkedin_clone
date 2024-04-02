
import * as dbutils from '../../config/dbConfig'
import { RowDataPacket } from 'mysql2'

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