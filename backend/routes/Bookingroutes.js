const express = require('express')
const router = express.Router()
const bookingcontroller = require('../controllers/BookingController')
router.get('/allbookings',bookingcontroller.getallbookings)
router.get('/getbookingsbyuser/:userid',bookingcontroller.getbookingsbyuser)
router.post('/newbooking',bookingcontroller.bookservice)
router.put('/updatestatus/:id',bookingcontroller.updatebookingStatus)
module.exports = router