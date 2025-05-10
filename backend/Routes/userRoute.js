import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()


const router = express.Router()

//JWT_SECRET = process.env.JWT_SECRET



router.post('/signup' , async(req , res) => {
    try {
        const {name , password , email} = req.body
    if(!name || !password || !email) {
        return res.status(400).json({message : 'Fill the required fields'})
    }
    const hashPassword = await  bcrypt.hash( password,10)
    const existedUser = await User.findOne({email})
    if(existedUser) return res.status(400).json({message: 'Please Login'})
    const newUser = await User({
       name,
       email,
       password : hashPassword
   })
   await newUser.save()
   return res.status(201).json({
    message: 'User created successfully',
    user: {
        id: newUser._id.toString(),
        name: newUser.name,
        email: newUser.email,
    },
});
    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'User cannot be created'})
    }

})

router.post('/login' , async(req , res) => {
    try {
        const {email , password} = req.body
        const userExist = await User.findOne({email})
        if(!userExist) return res.status(400).json({message : "Please Sign Up first"})
            const isMatch = await bcrypt.compare(password , userExist.password)
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid Credentials'})
        }
        const token =  jwt.sign({id : userExist._id} , process.env.JWT_SECRET , {expiresIn : '2h'})
        return res.status(200).json({
            token,
            user: {
                id: userExist._id.toString(), // Ensure it's a string if needed
                name: userExist.name,
                email: userExist.email,
            },
            message: 'Login Successful',
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({message : 'Login failed'})
    }
})

export default router