import React from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

import AllBookings from './pages/AllBookings'
import AddMechanicForm from './forms/AddMechanicForm'
import AllMechs from './pages/AllMechs'
import AddServiceForm from './forms/AddServiceForm'
import AllServices from './pages/AllServices'
import SingleService from './pages/SingleService'
import AllUsers from './pages/AllUsers'
import AllUserBookings from './pages/AllUserBookings'
import AddSpareParts from './forms/AddSpareParts'
import AllSpareParts from './pages/AllSpareParts'



const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<AllBookings/>}/>
          <Route path='/addmech' element={<AddMechanicForm/>}/>
          <Route path='/allmechs' element={<AllMechs/>}/>
          <Route path='/addservice' element={<AddServiceForm/>}/>
          <Route path='allservices' element={<AllServices/>}/>
          <Route path='/service/:id' element={<SingleService/>}/>
          <Route path='allusers' element={<AllUsers/>}/>
          <Route path='/userbookings/:id' element={<AllUserBookings/>}/>
          <Route path='/addspareparts' element={<AddSpareParts/>}/>
          <Route path='/allspareparts' element={<AllSpareParts/>}/>
        </Routes>


      </Router>
    
      
     
    
      
      
    </div>
  )
}

export default App
