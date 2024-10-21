const userModal = require("../../models/userModal")

const userDetailsController = async(req,res)=>{
    try{
        console.log("user id", req.userId)
        const user = await userModal.findById(req.userId)

        res.status(200).json({
            data: user,
            error:false,
            success: true,
            message: "user details"
        })

        console.log("user", user)

    }catch(err){
        res.json({
            message: err.message || err,
            success: false,
            error: true
        })
    }
}

module.exports = userDetailsController