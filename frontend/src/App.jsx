import React from 'react'
import SignupForm from './forms/SignupForm'
import LoginForm from './forms/LoginForm'

import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'

import Homepage from './pages/Homepage'

import AllServices from './pages/AllServices'
import SingleService from './pages/SingleService'

import BookService from './forms/BookService'
import UserBookings from './pages/UserBookings'
import AllSpareParts from './pages/AllSpareParts'



const App = () => {
  return (
    <div>
        <Router>
        <Routes>
          <Route path='/signup' element={<SignupForm/>}/>
          <Route path='/login' element = {<LoginForm/>}/>
         
          <Route path='/services' element={<AllServices/>}/>
          <Route path='/' element={<Homepage/>} />
          <Route path='/services/:id' element = {<SingleService/>}/>
         <Route path='/bookservice/:id' element={<BookService/>}/>
         <Route path='//bookings' element={<UserBookings/>}/>
         <Route path='/allspareparts' element={<AllSpareParts/>}/>
        </Routes>
       </Router> 
    </div>
  )
}

export default App