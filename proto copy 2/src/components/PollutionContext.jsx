import { createContext, useContext, useEffect, useState } from "react";

const pollutionContext = createContext()

export const PollutionContextProvider = ({children}) => {
   const savedUser = JSON.parse(localStorage.getItem('currentUser'))
 const [currentUser , setCurrentUser] = useState(savedUser || null)
 const [latitude , setLatitude] = useState(savedUser?.latitude || null)
 const [longitude , setLongitude] = useState(savedUser?.longitude || null)
 useEffect(() => {
   if (currentUser) {
      try {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      } catch (error) {
        console.error("Error saving user to localStorage", error);
      }
    } else {
      try {
        localStorage.removeItem("currentUser");
      } catch (error) {
        console.error("Error removing user from localStorage", error);
      }
    }
 } ,[currentUser])
 const contextValue = {
    currentUser,setCurrentUser,
    latitude , setLatitude,
    longitude,setLongitude

 }
 return (
    <pollutionContext.Provider value={contextValue}>
        {children}
    </pollutionContext.Provider>
 )
}

export const usePollutionContext = () =>useContext(pollutionContext)