import express from 'express';
import mysql, { RowDataPacket } from 'mysql2'
import * as dbutils from '../../config/dbConfig'

export async function getprofiledetailsMdl(userID:number){

    const find_user_query =  `select * from user_details where user_id not in (${userID})`
    console.log(find_user_query)
    let result:  RowDataPacket = await dbutils.query_excution(find_user_query)
    return result

}