import express from 'express';
import mysql, { RowDataPacket } from 'mysql2'
import * as dbutils from '../../config/dbConfig'



export async function signupCheckDuplicateMdl(email: string){

    const check_duplicate_user_query = `select * from user_details where user_email = "${email}"`
    let result:  RowDataPacket = await dbutils.query_excution(check_duplicate_user_query)
    return result

}

type CreateUserParams = {
    user_username: string;
    user_password: string;
    user_email: string;
}

export async function createUserMdl(username: string, email:string, hashedPassword: string){

    const create_user_quer =  `insert into user_details set user_username = '${username}', user_email = '${email}', 
                            user_password = '${hashedPassword}', created_on = CURRENT_TIMESTAMP()`
    let result:  RowDataPacket = await dbutils.query_excution(create_user_quer)
    return result

}



export async function loginMdl(email:string){

    const find_user_query =  `select user_id,user_username,user_email,user_password from user_details where user_email = "${email}"`
    console.log(find_user_query)
    let result:  RowDataPacket = await dbutils.query_excution(find_user_query)
    return result

}

export async function saveTokenMdl(token: string, user_id: number){

    const find_user_query =  `insert into tokens set token = "${token}", user_id = ${user_id}, created_on = CURRENT_TIMESTAMP(), status = 1`
    let result:  RowDataPacket = await dbutils.query_excution(find_user_query)
    return result

}


export async function checkTokenMdl(token: string){
    console.log(token,"token in model")
    const find_user_query =  `select token,user_email, ud.user_id from tokens as t join user_details as ud on t.user_id = ud.user_id  where token = "${token}" and status = 1`
    let result:  RowDataPacket = await dbutils.query_excution(find_user_query)
    return result

}

export async function saveNewTokenMdl(token: string, user_id: number){

    const find_user_query =  `update tokens set status = 0 where user_id = ${user_id} and status = 1;`
    let result:  RowDataPacket = await dbutils.query_excution(find_user_query)
    const insertNewToken = `insert into tokens set token = "${token}", user_id = ${user_id}, created_on = CURRENT_TIMESTAMP(), status = 1`
    let results:  RowDataPacket = await dbutils.query_excution(insertNewToken)
    return result

}