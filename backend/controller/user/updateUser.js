const userModal = require("../../models/userModal")
const updateUser = async(req,res)=>{
    try{
        const{email, name, role,userId} = req.body
        const updateUser = await userModal.findByIdAndUpdate(userId, {$set: req.body},{new:true})

        res.status(200).json({
            message:"User Updated Successfully",
            data:updateUser,
            error:false,
            success: true
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error:true,
            success: false
        })
    }
}

module.exports = updateUser