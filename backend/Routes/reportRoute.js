import express from 'express'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
import Report from '../models/reportModel.js'
import multer from 'multer'
import cloudinary from '../utils/cloudinary.js'
import mongoose from 'mongoose'
dotenv.config()

const router = express.Router()



const upload = multer({storage: multer.memoryStorage()})
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

const geolocation = async(lat , lng) => {
    const apiKey = process.env.API_SECRET_KEY
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`

    try {
        const res = await fetch(url)
        const data = await res.json()
        if(data.results && data.results[0]) {
            return data.results[0]?.formatted
        }else {
           return 'Location not found'

        }
    } catch (error) {
        console.error('error' , error)
        return 'Unknown location'
    }
}

//posting the api

router.post('/', upload.single('img'), async (req, res) => {
    try {
      const { user_id, type, desc, lat, lng } = req.body;
      const file = req.file;
  
      console.log('Received Body:', req.body);
      console.log('File Received:', file);
  
      if (!user_id || !type || !desc || !lat || !lng || !file) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      if (!isValidObjectId(user_id)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
      }
  
      const validTypes = ["water", "soil", "air", "noise", "deforestation", "wildlife", "waste", "other"];
      if (!validTypes.includes(type.toLowerCase())) {
        return res.status(400).json({ message: 'Invalid type value' });
      }
  
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lng);
  
      console.log('Parsed Coordinates:', { latitude, longitude });
  
      if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ message: 'Invalid latitude or longitude values' });
      }
  
      const locationName = await geolocation(latitude, longitude);
  
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'pollution_reports' },
          (error, result) => {
            if (error) {
              console.error('Cloudinary Error:', error);
              reject('Image upload failed');
            } else {
              console.log('Cloudinary Upload Result:', result);
              resolve(result);
            }
          }
        );
        stream.end(file.buffer);
      });
  
      const newReport = new Report({
        user_id,
        img: uploadResult.secure_url,
        type,
        desc,
        location: {
          lat: latitude,
          lng: longitude,
        },
        locationName 
      });
  
      console.log('New Report Before Save:', newReport);
  
      const savedReport = await newReport.save();
      return res.status(201).json({ savedReport });
  
    } catch (error) {
      console.error('Error in POST route:', error);
      return res.status(400).json({ message: 'Error saving the report', error });
    }
  });
  

router.get('/', async(req , res) => {
    try {
        const {user_id , type} = req.query
        if(!user_id){
           return res.status(400).json({message: 'cannot find the user'}
            )
        }
        if (!mongoose.Types.ObjectId.isValid(user_id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        const filter = {user_id : new mongoose.Types.ObjectId(user_id)}
        if(type){
            filter.type = type
        }
        const reports = await Report.find(filter).sort({createdAt : -1})
        return res.status(200).json(reports)
    } catch (error) {
        console.error(error)
        return res.status(400).json('cannot get reports')
    }
})

router.delete('/:id' , async(req , res) => {
    try {
        const {id} = req.params
        if (!isValidObjectId(id)) {
            return res.status(400).json({ message: 'Invalid report ID format' });
        }
        const deltedReport = await Report.findByIdAndDelete(id)
        if(!deltedReport){
          return res.status(400).json({message : 'Cannot Delete'})
        }
        return res.status(200).json({message: 'Report deleted successfully'})
    } catch (error) {
        console.error(error)
        return res.status(400).json({message:'error in deleting'})
    }

})
// router.get('/:id' ,async(req,res) => {
//     try {
//     const report = await Report.findById(req.params.id)
//         if(!report){
//             return res.status(400).json({message : 'Report not found'})
//         }
//         return res.status(200).json(report)
//     } catch (error) {
//         console.error(error)
//         return res.status(400).json({message : 'Failed to fetch the report'})
//     }
// })
router.put('/:id' ,async(req , res) => {
   
    try {
        const updatedReport = await Report.findByIdAndUpdate(
            req.params.id,
            {$set:req.body},
            {new: true}
        );
        if(!updatedReport){
            return res.status(404).json({message: 'Cannot update'})
        }
        return res.status(201).json({updatedReport})
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Failed to update report' });
    }
})
const haversine = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
};

router.get('/all', async (req, res) => {
    const { lat, lng, maxDistance } = req.query;
    
    if (!lat || !lng) {
        return res.status(400).json({ message: 'Latitude and Longitude are required' });
    }
    
    try {
      
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        
       
        const distanceLimit = maxDistance ? parseFloat(maxDistance) : 50;
        
        const reports = await Report.find();
        
        const nearbyReports = reports.filter(report => {
      
            const reportLat = report.location?.lat; 
            const reportLng = report.location?.lng;
            
            if (!reportLat || !reportLng) return false;

            const distance = haversine(latitude, longitude, reportLat, reportLng);
            return distance <= distanceLimit; 
        });

        return res.status(200).json(nearbyReports); 
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Request failed' });
    }
});




export default router;