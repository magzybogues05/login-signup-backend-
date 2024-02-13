const express=require('express');
const router=express.Router();
import userController from '../controllers/userController';

//public routes
router.post('/register',userController.userRegister)
router.post('/login',userController.userLogin)


module.exports= router;