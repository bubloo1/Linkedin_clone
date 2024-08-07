require('dotenv').config()
import express from 'express'
const app = express()
const PORT = 3500
import bodyParser from 'body-parser'
import mainRtr from "./routes/mainRtr"
import 'dotenv/config'
import session from 'express-session'
import cors from 'cors'
import http from 'http';
import cookieParser from 'cookie-parser'
const server = http.createServer(app);
const socketIO = require('socket.io');
import mongoose from 'mongoose'
import {connetDB} from './config/dbConfig'

connetDB()


const io =  socketIO(server,{
  cors:{
    origin: 'http://localhost:5173',
    methods: ["GET", "POST"],
    allowedOrigins: ['Access-Control-Allow-Origin']
  }
})

const allowedOrigins = ['http://localhost:5173']

app.use(cors({
    origin: allowedOrigins, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['Authorization', 'Content-Type', 'authorization']
  }))

app.use(bodyParser.json({limit: '50mb'}))
// app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json())

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

  // type socketUserMapType = {
  //   userID: string
  // }
  let socketUserMap: { [userID: string]: string } = {}

io.on('connection', (socket: any) => {
  console.log(`user connected with id ${socket.id}`);

  socket.on('setupUserID',(userID:{userID:string}) => {
    socketUserMap[userID.userID] = socket.id
    console.log(socketUserMap,"socketuserMAp")
  })

  socket.on('message', (message: any) => {
    console.log(message,"message")
    if(message.userID){

      socket.to(socketUserMap[message.userID]).emit('send-to-client',message)
      console.log(socketUserMap[message.userID],"sdfdfdfdfwse")
    }
  });

  // socket.on('disconnect', () => {
  //   console.log('User disconnected');
  // });
});

//serve static files
app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',mainRtr)

// have installed nodemon and ts-node to excute .ts file directly
mongoose.connection.once('open', () => {
  console.log("connected to Mongose")
  server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
})