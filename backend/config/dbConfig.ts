import mysql, { RowDataPacket } from 'mysql2'

import mongoose from 'mongoose';

 export const connetDB = async () => {
  if(process.env.DATABASE_URI){
    const dbConn = process.env.DATABASE_URI
    try{
      await mongoose.connect(dbConn)
    }catch(error){
      console.log(error)
    }
  }
}



const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'test#123',
    database: 'personal_project',
  });

export async function query_excution(query_to_execute: string): Promise<RowDataPacket>{
   
    return new Promise((resolve ,reject) => {

        connection.query(query_to_execute, (err: any, results: RowDataPacket, fields: any) => {
            console.log("query ininininininin")
            if (err) {
              console.error('Error executing query:', err);
              reject(err)
              return;
            }

            // connection.end((err) => {
            //     if (err) {
            //     console.error('Error closing MySQL connection:', err);
            //     }
            //     console.log('Connection closed');
            // });
        
        
            resolve(results)
      });

    }) 

}

