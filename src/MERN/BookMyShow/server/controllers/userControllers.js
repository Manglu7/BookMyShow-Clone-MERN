const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const register = async function (req, res) {
    try{
        const userExists = await User.findOne({email: req.body.email});
        if(userExists){
            return res.send({
                success: false,
                message: 'User already exists'
            })
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.send({
            success: true,
            message: 'Successfully registered',
            user: newUser
        })
    }
    catch(err){
        console.log(err);
    }
}

const login = async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        console.log(token);
        if(!user){
            return res.send({
                success: false,
                message: 'User not found, please register'
            })
        }

        if(req.body.password !== user.password){
            return res.send({
                success: false,
                message: 'Passwords do not match'
            })
        }

        res.send({
            success: true,
            message: 'Successfully logged in',
            data: token
        })
    }
    catch(err){
        console.log(err);
    }
}

const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.body.userId).select('-password');
    if(!user){
        res.send({
            success: false,
            data: null,
            message: 'User not found'
        })
    }
    else{
        res.send({
            success: true,
            data: user,
            message: 'You are authorized to go the protected route'
        })
    }
}

module.exports = {
    register,
    login,
    getCurrentUser
}