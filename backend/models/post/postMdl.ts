
import * as dbutils from '../../config/dbConfig'
import { RowDataPacket } from 'mysql2'

export async function showPostMdl(){
    const insertPost =  `SELECT * FROM personal_project.posts`
    let result:  RowDataPacket[] = await dbutils.query_excution(insertPost)
    return result
}

export async function postMdl(post:string){

    const insertPost =  `insert into posts set user_post = '${post}', user_id = 999, 
    created_on = CURRENT_TIMESTAMP()`
    let result:  RowDataPacket[] = await dbutils.query_excution(insertPost)
    return result

}