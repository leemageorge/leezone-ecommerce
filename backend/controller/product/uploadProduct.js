

const productModal = require("../../models/productModal")
const uploadProductPermission = require("../../helpers/permission")

const uploadProductController = async(req,res)=>{
    try{
        const sessionId = req.userId
        if(!uploadProductPermission(sessionId)){
            throw new Error("Permission Denied")
        }
       
        const uploadProduct = new productModal(req.body)
        const savedProduct = await uploadProduct.save()

        res.status(200).json({
            message: "Upload Product Successfully",
            data: savedProduct,
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

module.exports = uploadProductController