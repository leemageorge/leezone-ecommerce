const uploadProductPermission = require("../../helpers/permission")
const productModal = require("../../models/productModal")
const updateProductController = async(req,res)=>{
    try{
        const{_id, ...resBody} = req.body
        if(!uploadProductPermission(req.userId)){
            throw new Error("Permission Denied")
        }
        
    const updateProduct = await productModal.findByIdAndUpdate(_id, {$set:req.body},{new:true})
    res.status(200).json({
        message: "Product Update SuccessFully",
        error: false,
        success:true,
        data : updateProduct

    })
    }catch(err){
       res.status(500).json({
        message: err.message || err,
        error: true,
        success: false
       })
    }
}

module.exports = updateProductController