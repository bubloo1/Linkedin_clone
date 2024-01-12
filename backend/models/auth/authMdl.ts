import express from 'express';
import mysql, { RowDataPacket } from 'mysql2'
import * as dbutils from '../../config/dbConfig'



export async function signupCheckDuplicateMdl(email: string){

    const check_duplicate_user_query = `select * from user_details where user_email = "${email}"`
    let result:  RowDataPacket[] = await dbutils.query_excution(check_duplicate_user_query)
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
    let result:  RowDataPacket[] = await dbutils.query_excution(create_user_quer)
    return result

}

type user_login_params = {
    user_password: string,
    user_email: string
}

export async function loginMdl(login_credentials: user_login_params){

    const find_user_query =  `select user_id,user_username,user_email,user_password from user_details where user_email = "${login_credentials.user_email}"`
    let result:  RowDataPacket[] = await dbutils.query_excution(find_user_query)
    return result

}

export async function postMdl(post:string){

    const insertPost =  `insert into posts set user_post = '${post}', user_id = 999, 
    created_on = CURRENT_TIMESTAMP()`
    let result:  RowDataPacket[] = await dbutils.query_excution(insertPost)
    return result

}