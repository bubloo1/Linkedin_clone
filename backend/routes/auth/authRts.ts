import express  from "express";
import * as authCtrl from '../../controllers/auth/authCtrl'


const authRouter = express.Router()

authRouter.post("/signup", authCtrl.signupController)
authRouter.post("/login", authCtrl.loginController)
authRouter.post("/upload", authCtrl.upload.single('images'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
})


module.exports = authRouter