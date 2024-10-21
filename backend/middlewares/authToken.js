
const jwt = require("jsonwebtoken")
const authToken = async(req,res,next)=>{

    try{
        const token = req.cookies?.token
        console.log("token", token)

        if(!token){
            return res.json({
                message: "Please Login...!",
                error: true,
                success: false
            })
           
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function(err, decoded) {
            console.log(err)
            console.log("decoded", decoded)
          if(err){
            console.log("Error", err)
          }
          req.userId = decoded?._id
          next()
        
          });
          
       

    }catch(err){
        res.json({
            message: err.message ||  err,
            data: [],
            success:false,
            error: true
        })
    }
}
module.exports = authToken