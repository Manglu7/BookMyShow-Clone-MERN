const express = require('express');
const { register, login, getCurrentUser} = require('../controllers/userControllers');
const auth = require("../middlewares/authMiddlewares");

const userRouter = express.Router();

userRouter.post('/register', register)

userRouter.post('/login', login)

userRouter.get('/get-current-user', auth, getCurrentUser)

module.exports = userRouter;
