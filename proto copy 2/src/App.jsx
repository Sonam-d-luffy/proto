import React from 'react'

import './App.css'
import Home from "./components/Home"
import Navbar from './components/Navbar'

import {Route , Routes} from 'react-router-dom'

const App = () => {
 

  return (

    <>
    <Navbar/>
    <Routes>
   
    <Route path='/' element={<Home/>}/>

   

   </Routes>       
    </>
    
   
  )
}

export default App
