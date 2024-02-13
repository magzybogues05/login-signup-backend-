const jwt=require('jsonwebtoken');
const UserModel=require('../models/User');

const UserAuth= async (req,res)=>{
    // let token
    // const {authorization}=req.headers
    // if(authorization && authorization.startswith('Bearer')){
    //     try{
    //         token=authorization.split(' ')[1];

    //         //verify token
    //         const {userId}=jwt.verify(token,process.env.JWT_SECRET_KEY);

    //         //get user from token

    //         req.user=await UserModel.findOne(userId).select(-password)

    //     }
    //     catch(error){

    //     }
    // }
}