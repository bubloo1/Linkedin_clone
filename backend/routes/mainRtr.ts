import express  from "express";

const router = express.Router()


router.use("/auth",require('../routes/auth/authRts'))
router.use("/post",require('../routes/posts/postRts'))

export default router



