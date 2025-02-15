const express = require('express')
const router = express.Router()
const upload = require('../middlewares/multerconfig')
const servicecontroller = require('../controllers/ServiceController')
router.post('/addnewservice',upload.single('image'),servicecontroller.addNewService)
router.delete('/deleteservice/:id',servicecontroller.deleteservice)
router.get('/allservices',servicecontroller.getallservices)
router.get('/getservicebyid/:id',servicecontroller.getservicebyid)
module.exports = router