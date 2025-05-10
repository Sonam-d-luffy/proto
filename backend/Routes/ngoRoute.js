import express from 'express'
import NGO from '../models/ngoModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fetch from 'node-fetch'
import User from '../models/userModel.js'
import dotenv from 'dotenv'
import axios from 'axios'
import * as cheerio from 'cheerio'
dotenv.config()
const router = express.Router()

// const verifyNgo = async(inputId) => {
//    const searchurl = `https://ngodarpan.gov.in/index.php/search?q=${inputId}`
//    try {
//     const res = await axios.get(searchurl , {
//           headers: {'User-Agent' : 'Mozilla/5.0'}
//     })
//     const $ = cheerio.load(res.data)
//     const text = $('body').text()
//     const match = text.match(/Unique Id of VO\/NGO:\s*([A-Z0-9\/]+)/);
//     const realId = match ? match[1] : null
//     return realId && realId===inputId
//    } catch (error) {
//     console.error(error)
//     return false
//    }
// }
const getAddressFromCoors = async(latitude , longitude) => {
    const API_KEY = process.env.OPENCAGE_API_KEY

    const url =  `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        if(data || data.results){
            return data.results[0]?.formatted
        }else {
'Location Not found'
        }
         
    } catch (error) {
        console.error(error)
        return 'Unknowmlocation'
    }
}
 const JWT_SECRET = process.env.JWT_SECRET
router.post('/signup' , async(req , res)=> {
    const {email,
        password,
        organizationName,
        darpanId,
        mission,
        areaOfOperation,
        latitude,
        longitude} = req.body
    try {
        // const isValidId = await verifyNgo(registrationNumber)
        // if(!isValidId){
        //     return res.status(400).json({message : 'Invalid Darpan Id'})
        // }
        const ngoExists = await User.findOne({email})
        if(ngoExists) return res.status(400).json({message: 'NGO already exists , please login'})
            const address = await getAddressFromCoors(latitude , longitude)
            const hashedPassword = await bcrypt.hash(password , 10)
            const newUser = new User({
                email,
                password: hashedPassword,
                role:'ngo',
                name: organizationName
            })
            await newUser.save()
            try {
                const newNGO = new NGO({
                    organizationName,
                    darpanId,
                    address,
                    mission,
                    areaOfOperation,
                    email,
                    user: newUser._id,
                    latitude,
                    longitude
                });
                await newNGO.save();
            
                const token = jwt.sign({ id: newNGO._id }, JWT_SECRET, { expiresIn: '7d' });
                return res.status(201).json({ ngo: newNGO, token });
            } catch (error) {
                // Cleanup: delete the User if NGO creation fails
                await User.findByIdAndDelete(newUser._id);
                console.error(error);
                return res.status(500).json({ message: 'Sign Up failed while creating NGO' });
            }
    } catch (error) {
        console.error(error)
        return res.status(500).json({message : 'Sign Up failed'})
    }
})

router.post('/login' , async(req , res) => {
    const {email , password } = req.body
    try {
        const ngo = await User.findOne({email})
        if(!ngo) {
            return res.status(404).json({message: 'NGO not found'})
        }
        const isMatch = await bcrypt.compare(password , ngo.password)
        if(!isMatch){
            return res.status(400).json({messsage: 'Invalid credentials'})
        }
        const token = jwt.sign({id: ngo._id } , JWT_SECRET , {expiresIn: '7d'})
        return res.status(201).json({message: 'Login Successful' , token})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Login failed'})
    }
})

export default router