const express = require('express')
const upload = require('../middlewares/multerconfig')
const sparepartcontroller = require('../controllers/SparePartsController')
const router = express.Router()
router.post('/addsparepart',upload.single('sparepartimage'),sparepartcontroller.addsparepart)
router.get('/allspareparts',sparepartcontroller.getallspareparts)
router.delete('/deletesparepart/:id',sparepartcontroller.deletesparepart)
module.exports = router