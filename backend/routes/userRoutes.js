const express = require('express')
const router = express.Router()
const adduserController = require('../controllers/userController')
router.post('/adduser',adduserController.addnewUser)
router.post('/userlogin',adduserController.userLogin)
router.get('/allusers',adduserController.getallusers)
router.get('/getuserbyid/:id',adduserController.getuserbyid)
module.exports = router