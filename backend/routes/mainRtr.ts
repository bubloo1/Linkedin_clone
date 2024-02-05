import express  from "express";

const router = express.Router()


router.use("/auth",require('../routes/auth/authRts'))
router.use("/post",require('../routes/posts/postRts'))
router.use("/profile",require('../routes/profile/profileRts'))
router.use("/chat",require('../routes/chat/chatRts'))

export default router



