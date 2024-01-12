
import * as dbutils from '../../config/dbConfig'
import { RowDataPacket } from 'mysql2'

export async function showPostMdl(){

    const insertPost =  `SELECT * FROM personal_project.posts`
    let result:  RowDataPacket[] = await dbutils.query_excution(insertPost)
    return result

}