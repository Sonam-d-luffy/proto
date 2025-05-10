import React from "react"

import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom"
import Home from "./components/Home"
function Layout(){
    return(
    <>

            <div className="mb-2"> 
            <Navbar />
            </div>
            <Outlet />
            {/* <Home /> */}


    </>
    )
}

export default Layout

