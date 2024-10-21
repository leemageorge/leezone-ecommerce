 const userModel = require("../../models/userModal")
 const bcrypt = require('bcryptjs');
 const jwt = require('jsonwebtoken');

 const userSignInController = async(req,res)=>{
    try{
        const {email, password} = req.body
      
        if(!email){
            throw new Error("Please provide Email")
        }
        if(!password){
            throw new Error("Please provide Password")
        }
        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("User not found")
        }
        const checkPassword = await bcrypt.compare(password,user.password);

      if (checkPassword){
        const tokenData= {
            _id: user._id,
            email: user.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET_KEY,{expiresIn: "8h"})
        const tokenOptions ={
            httpOnly: true,
            secure:true
        }
        res.cookie("token", token,tokenOptions).status(200).json({
            message: "User has been Login successfully!!",
            data: token,
            error:false,
            success: true
        })


      }else{
        throw new Error("Please check passwrod")
      }


    }catch(err){
          res.status(500).json({
            message: err.message || err,
            success:false,
            error: true 
        })
    }
 }

 module.exports = userSignInController