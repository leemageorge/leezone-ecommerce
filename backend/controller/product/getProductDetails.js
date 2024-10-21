const productModal = require("../../models/productModal")

const getProductDetails = async(req,res)=>{
    try{

        const { productId } = req.body

        const product = await productModal.findById(productId)

        res.status(200).json({
            data : product,
            message: "ok",
            error: false,
            success: true
        })

    }catch(err){
        res.status(400).json({
            message: err?.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = getProductDetails