import * as dbutils from '../../config/dbConfig'
import { RowDataPacket } from 'mysql2'

import mongoose from "mongoose";
import { AutoIncrementID } from '@typegoose/auto-increment';

export const networkSchema = new mongoose.Schema({
  connection_id:{
      type: Number,
      unique: true
  },
  connection_from_id:{
      type: Number,
      required: true,
  },
  connection_to_id: {
      type: Number,
      required: true,
  },
  connection_status:{
      type: Number,
      default: 0
  },
  created_on:{
      type: String
  },
  
})

networkSchema.plugin(AutoIncrementID, { field: 'connection_id' });

export const networkCollection : mongoose.Model<any> = mongoose.model("network",networkSchema)

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

export async function getNotificationConnectionDetailsMdl(user_id:number){
  const qry = `select connection_id, ud.first_name, ud.last_name, ud.profile_url from network_connections join user_details as ud on connection_from_id = user_id 
    where connection_to_id = ${user_id} and connection_status = 0;`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}

export async function updateConnectionStatusMdl(connection_id:string){
  const qry = `update network_connections set connection_status = 1 where connection_id = ${connection_id};`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}

export async function connectionCountMdl(connection_id:string){
  const qry = `select count(*) as connectionsCount from network_connections where connection_from_id = ${connection_id} and connection_status = 1;`
  console.log(qry,"qry")
  let result:  RowDataPacket = await dbutils.query_excution(qry)
  return result
}

// {
//   connection_from_id: 1,
//   connection_to_id: 3,
//   connection_status: 0,
//   _id: new ObjectId('669e472f59cb8bd9f6792559'),
//   connection_id: 3,
//   __v: 0
// } create post