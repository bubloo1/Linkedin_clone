import express from 'express'
const app = express()
const PORT = 3500
import bodyParser from 'body-parser'
import mainRtr from "./routes/mainRtr"
import 'dotenv/config'
import path  from 'path'
import cors from 'cors'
// app.get("/main",(req:express.Request,res:express.Response) => {
//     return res.send("Hello world!!!!!!")
// })

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({extended: true}));

//serve static files
app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',mainRtr)

// have installed nodemon and ts-node to excute .ts file directly
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})