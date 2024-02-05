import express from 'express';
import mysql, { RowDataPacket } from 'mysql2'
import * as dbutils from '../../config/dbConfig'

export async function getprofiledetailsMdl(){

    const find_user_query =  `select user_id,user_username from user_details`
    console.log(find_user_query)
    let result:  RowDataPacket = await dbutils.query_excution(find_user_query)
    return result

}