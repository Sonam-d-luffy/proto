
import React, { useEffect, useState } from "react";
import { Camera, MapPin, AlertTriangle, Send, Upload } from "lucide-react";
import { usePollutionContext } from "./PollutionContext";
import axios from 'axios'

const IssueReport = () => {

  const [desc , setDesc] = useState('')
  const [img , setImg] = useState(null)
  const [lat , setLat] = useState(null)
  const [lng , setLng] = useState(null)
  const [loading , setLoading] = useState(false)
  const [message , setMessage] = useState('')
  const [locErr , setLocErr] = useState('')
  const [locationName , setLocationName] = useState('')
  const [submitted, setSubmitted] = useState(false);
  //const [preview , setPreview] = useState(null)
  const [type , setType] = useState('water')

  const {currentUser} = usePollutionContext()
  // getting current location for the user

 const open_cage_apiKey = '52f2129621cb4d4aa6f632266162fe0f'

  const getLocationName = async(lat , long) => {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=${open_cage_apiKey}`
       try {
          const res = await fetch(url)
          const data = await res.json()
          if(data.results && data.results[0]){
              setLocationName(data.results[0].formatted)
          } else {
              setLocationName('Not found')
          }
       } catch (error) {
          console.error(error)
          setLocationName('Location lookup failed')
       }
  }
  
  useEffect(() => {
      navigator.geolocation.getCurrentPosition(
          (pos) => {
              const rptcoords = {
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude
              };
              setLat(rptcoords.lat)
              setLng(rptcoords.lng)
              getLocationName(pos.coords.latitude , pos.coords.longitude)
              localStorage.setItem('reportCoords' , JSON.stringify(rptcoords))
          },
          (err) => {
              console.error(err)
              setLocErr('Location access denied .')
          }
      )
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!img || !lat || !lng || !desc) {
      alert('All fields are required.');
      return;
    }
  console.log(currentUser)
    if (!currentUser || !currentUser.id) {
      alert('You must be logged in to submit a report.');
      return;
    }
   
    
    const formdata = new FormData();
    formdata.append('user_id', currentUser.id);
    formdata.append('type', type.toLowerCase());
    formdata.append('img', img);
    formdata.append('desc', desc);
    formdata.append('lat', lat);
    formdata.append('lng', lng);
    formdata.append('locationName', locationName);
  
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/reports', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      setMessage(res.data.message || "Report submitted");
      setDesc('');
      setImg(null);
      setType('Water');
      setSubmitted(true);
  
    } catch (error) {
      console.error(error);
      setMessage('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleDesc = (e) => {
      const inputText = e.target.value;
      const words = inputText.trim().split(/\s+/);
  
      if (words.length <= 200) {
        setDesc(inputText);
      } else {
        // Limit to first 200 words
        const trimmed = words.slice(0, 200).join(' ');
        setDesc(trimmed);
      }
    }

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   setImg(file);
    
  //   // Create preview
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   } else {
  //     setPreview(null);
  //   }
  // };


  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 p-8 mt-10 rounded-lg shadow-lg">
        <div className="text-center py-16">
          <div className="mb-6 text-green-600">
            <AlertTriangle size={48} className="mx-auto" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-green-700">Thank You!</h2>
          <p className="text-lg text-gray-700 mb-8">
            Your environmental issue report has been submitted successfully. Together, we can make a difference.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Report Another Issue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-br from-green-50 to-blue-50 p-8 mt-10 rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-2 text-green-700">
          Be an Environmental Hero
        </h2>
        <p className="text-gray-600">Report issues to help protect our planet</p>
      </div>
      
      <div className="space-y-6">
        {/* Issue Type */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="flex items-center mb-2 text-gray-800 font-medium">
            <AlertTriangle size={20} className="mr-2 text-amber-500" />
            <span>Type of Issue</span>
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          >
         
            <option value="water">Water Pollution</option>
            <option value="soil">Soil Pollution</option>
            <option value="air">Air Pollution</option>
            <option value="noise">Noise Pollution</option>
            <option value="deforestation">Deforestation</option>
            <option value="wildlife">Wildlife Endangerment</option>
            <option value="waste">Illegal Waste Dumping</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Location */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="flex items-center mb-2 text-gray-800 font-medium">
            <MapPin size={20} className="mr-2 text-red-500" />
            <span>Location</span>
          </label>
          {locationName &&  <div
         
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >{locationName}</div>}
         
        </div>

        {/* Image Upload */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="flex items-center mb-2 text-gray-800 font-medium">
            <Camera size={20} className="mr-2 text-blue-500" />
            <span>Upload a Photo</span>
          </label>
          
          <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImg(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <label className="flex items-center mb-2 text-gray-800 font-medium">
            <span>Description</span>
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows="5"
            placeholder="Describe the environmental issue in detail..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          ></textarea>
        </div>

        {/* Submit */}
        <div className="text-center pt-4">
          <button
            onClick={handleSubmit}
            className="flex items-center justify-center mx-auto bg-gradient-to-r from-green-600 to-emerald-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
          >
            <Send size={20} className="mr-2" />
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueReport;
