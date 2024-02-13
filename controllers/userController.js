const UserModel=require('../models/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


const userRegister=async (req,res)=>{
    const {name,email,password,password_confirm,tc}=req.body;
    const user=await UserModel.findOne({email:email});
    if(user)
    {
        res.send({
            "status":409,
            "message":"email already exists"
        });
    }
    else{
        try{
            const salt=await bcrypt.genSalt(10);
            const hashPassword=await bcrypt.hash(password,salt);
            const doc=new UserModel({
                name:name,
                email:email,
                password:hashPassword,
                tc:tc
            });
            await doc.save();

            const saved_user=await UserModel.findOne({email:email});

            //creating jwt token
            const token=jwt.sign({userID:saved_user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
            res.send({
                "status":200,
                "message":"successfully registered",
                "token":token  
            });
        }
        catch(error)
        {
            console.log(error);
            res.send({
                "status":400,
                "message":"error registering"
            });
            
        }
    }
}


const userLogin= async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await UserModel.findOne({email:email});
        if(user)
        {
            const isMatch=await bcrypt.compare(password,user.password);
            if((user.email===email) && isMatch)
            {
                //generating JWT token
                const token=jwt.sign({userID:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'5d'});
                res.send({
                    "status":200,
                    "message":"successfully logged in",
                    "token":token
                })
            }
            else{
                res.send({
                    "status":400,
                    "message":"either email or password is wrong"
                })
            }
        }
        else{
            res.send({
                "status":400,
                "message":"Please Signup first"
            })
        }
    }
    catch(error){
        console.log(err);
    }
}

module.exports={userRegister,userLogin};