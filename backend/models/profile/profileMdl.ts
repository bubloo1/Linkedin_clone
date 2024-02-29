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

export async function saveProfileDetailsMdl(profileDetails:profileDetails){
    const values: string[] = [];

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
    const insertProileDetails =  `insert into user_details set  
    updated_on = CURRENT_TIMESTAMP(), ${qry};`;
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