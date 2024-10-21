const productModal = require("../../models/productModal")

const getCategoryWiseProduct = async(req,res)=>{
    try{
        const { category } = req?.body || req?.query
        const product = await productModal.find({ category })

        res.status(200).json({
            data: product,
            message: "Product",   
            error:false,
            success: true
        })

    }catch(err){
        res.status(400).json({
            message: err.message || err,
            error:true,
            success: false
        }) 
    }
}

module.exports = getCategoryWiseProduct