import * as dbutils from '../../config/dbConfig'
import { RowDataPacket } from 'mysql2'

type profileDetails = {
    selectedPronouns?:string
    firstName?: string
    lastName?: string
    additionalName?: string
    headline?: string
    country?: string
    city?: string
}

export async function saveProfileDetailsMdl(profileDetails:profileDetails,user_id:any){
    const values: string[] = [];
    console.log(profileDetails,"profileDetails")
    Object.entries(profileDetails).forEach(([key, value]) => {
      if (value !== undefined) {
        switch (key) {
          case 'firstName':
            values.push(`first_name = '${value}'`);
            break;
          case 'lastName':
            values.push(`last_name = '${value}'`);
            break;
          case 'selectedPronouns':
            values.push(`gender = '${value}'`);
            break;
          case 'additionalName':
            values.push(`additional_name = '${value}'`);
            break;
          case 'headline':
            values.push(`headline = '${value}'`);
            break;
          case 'country':
            values.push(`country = '${value}'`);
            break;
          case 'city':
            values.push(`city = '${value}'`);
            break;
        }
      }
    });
    const qry = values.join(', ');
    console.log(qry,"qry")
    const insertProileDetails =  `update user_details set  
    updated_on = CURRENT_TIMESTAMP(), ${qry} where user_id = ${user_id};`;
    console.log(insertProileDetails,"insertProileDetails")
    let result:  RowDataPacket = await dbutils.query_excution(insertProileDetails)
    return result

}


export async function saveProfileUrlMdl(path:string|undefined,user_id: number){
  console.log(path,"path before")
  path = path?.replace(/\\/gi,"/")
  const qry = `update user_details set profile_url = '${path}' where user_id = ${user_id}`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}


export async function getProfileDetailsMdl(user_id: number){
  const qry = `select * from user_details  where user_id = ${user_id}`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}

export async function getAllProfileDetailsMdl(user_id:number){
  const qry = `select * from user_details where user_id not in (${user_id});`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}

export async function saveConnectionDetailsMdl(connectionFrom:number, connectionTo:number){
  const qry = `insert into network_connections set connection_from_id = ${connectionFrom}, connection_to_id = ${connectionTo}, created_on = CURRENT_TIMESTAMP();`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}


export async function getNotificationDetailsMdl(user_id:number){
  const qry = `select count(*) as notificationCount from network_connections where connection_to_id = ${user_id};`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}