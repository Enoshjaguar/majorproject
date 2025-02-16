import React from 'react'
import SignupForm from './forms/SignupForm'
import LoginForm from './forms/LoginForm'

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import AddServiceForm from './forms/AddServiceForm'
import Homepage from './pages/Homepage'

import AllServices from './pages/AllServices'
import SingleService from './pages/SingleService'

const App = () => {
  return (
    <div>
       <Router>
        <Routes>
          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='/login' element = {<LoginForm/>}/>
          <Route path='/addservice' element= {<AddServiceForm/>}/>
          <Route path='/services' element={<AllServices/>}/>
          <Route path='/' element={<Homepage/>} />
          <Route path='/services/:id' element = {<SingleService/>}/>
        
        </Routes>
       </Router>
       {/* <AllServices/> */}
       {/* <SingleService/> */}
    </div>
  )
}

export default App