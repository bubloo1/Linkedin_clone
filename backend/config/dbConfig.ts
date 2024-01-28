import mysql, { RowDataPacket } from 'mysql2'

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

// // import { createRequire } from 'module';
// // const require = createRequire(import.meta.url);
// var mysql = require('mysql');

// var MySQLConPool = {};

// var USER = 'root';
// var PWD = 'test#123';
// var DATABASE = 'personal_project';
// var DB_HOST_NAME = '127.0.0.1';
// // var DB_PORT = '3306';

// // var USER = 'WEBUAT';
// // var PWD = 'wEbU@t';
// // var DATABASE = 'BSS_ONLINE_UAT';
// // var DB_HOST_NAME = '172.17.4.110';
// // var DB_PORT = '3307';

// var MAX_POOL_SIZE = 800;
// var MIN_POOL_SIZE = 200;

// var MySQLConPool = mysql.createPool({
//        host: DB_HOST_NAME,
//        user: USER,
//        password: PWD,
//     //    port: DB_PORT,
//        database: DATABASE,
//        acquireTimeout: 5000,
//        connectionLimit: MAX_POOL_SIZE,
//        debug: false,
//        multipleStatements: false,
//        supportBigNumbers: true
// });


// MySQLConPool.on('acquire', function (connection) {
//        // log.info('Database Connection Acquired', connection.threadId);
// });
// MySQLConPool.on('release', function (connection) {
//        // log.info('Database Connection Released', connection.threadId);
// });
// MySQLConPool.on('enqueue', function () {
//        //  log.info('Waiting for available connection slot');
// });

// exports.MySQLConPool = MySQLConPool;