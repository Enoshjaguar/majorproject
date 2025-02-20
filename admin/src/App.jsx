import React from 'react'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Navbar from './pages/Navbar'
import AllBookings from './pages/AllBookings'
import AddMechanicForm from './forms/AddMechanicForm'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<AllBookings/>}/>
          <Route path='/addmech' element={<AddMechanicForm/>}/>
        </Routes>

      </Router>
      
    </div>
  )
}

export default App
