const express = require('express')
const router = express.Router()
const mechaniccontroller = require('../controllers/MechanicController')
router.post('/addmech',mechaniccontroller.addmechanic)
module.exports = router