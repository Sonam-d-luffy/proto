
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom'

import Layout from './Layout'
import './index.css'

import UserLogin from './components/UserLogin'
import UserRegister from './components/UserRegister'
import NGOLogin from './components/NGOLogin'
import Home from './components/Home'
import NGORegister from "./components/NGORegister"
import About from "./components/About"
import IssueReport from "./components/IssueReport"
import UserDashboard from "./components/UserDashboard"
import NGODashboard from "./components/NGODashboard"
import UserReports from "./pages/UserReports"
import { PollutionContextProvider } from './components/PollutionContext'

const router = createBrowserRouter(
  createRoutesFromElements(
        <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="login" element={<UserLogin />} />
            <Route path="UserRegister" element={<UserRegister />} />
            <Route path="NGOLogin" element={<NGOLogin />} />
            <Route path="ngoRegister" element={<NGORegister />} />
            <Route path="about" element={<About />} />
            <Route path="report" element={<IssueReport />} />
            <Route path="UserDashboard" element={<UserDashboard />} />
            <Route path="ngo/dashboard" element={<NGODashboard />} />
            <Route path="user/reports" element={<UserReports/>} />

        </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PollutionContextProvider>
    <RouterProvider router={router} />
    </PollutionContextProvider>
  </StrictMode>
)
