const userModal = require("../../models/userModal")

const allUsers = async(req,res)=>{

    try{
        console.log("userID",req.userId)
        
        const allUsers = await userModal.find()

        res.json({
            message: "All Users",
            data: allUsers,
            error:false,
            success:true
        })

    }catch(err){
        res.json({
            message: err.message || err,
            error:true,
            success: false
        })
    }
}
module.exports = allUsers