
const userLogout = async(req,res)=>{
    try{
        res.clearCookie("token")

        res.status(200).json({
            message: "Logged out successfully",
            data:[],
            error:false,
            success: true
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = userLogout