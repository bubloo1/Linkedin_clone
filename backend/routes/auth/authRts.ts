import express  from "express";
import * as authCtrl from '../../controllers/auth/authCtrl'


const authRouter = express.Router()

authRouter.post("/signup", authCtrl.signupController)
authRouter.post("/login", authCtrl.loginController)



module.exports = authRouter