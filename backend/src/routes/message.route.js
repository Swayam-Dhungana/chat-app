const express=require('express')
const { protectRoute } = require('../middlewares/protectRoute')
const { getUsersForSidebar } = require('../controllers/message.controller')
const router=express.Router()

router.get('/users',protectRoute,getUsersForSidebar)

module.exports=router