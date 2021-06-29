const express = require('express');

const userRouter = require('../api/user/router');

const errorMiddleware = require('../middlewares/errorMiddleware');

const router = express.Router();

router.use('/user', userRouter);



module.exports = router;
