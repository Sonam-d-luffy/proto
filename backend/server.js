import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import reportRoute from './Routes/reportRoute.js'
import userRoute from './Routes/userRoute.js'
import ngoRoute from './Routes/ngoRoute.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api/reports' , reportRoute)
app.use('/api/auth' , userRoute)
app.use('/api/ngoauth',ngoRoute)

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch((err) => console.error(err))

app.listen(process.env.PORT , () => console.log("server is running on 5000 port"))