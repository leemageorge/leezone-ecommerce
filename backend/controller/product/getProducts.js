const productModal = require("../../models/productModal")

const getProductController = async(req,res)=>{
    try{

        const allProducts = await productModal.find().sort({createdAt: -1})
        
        res.status(200).json({
            message: "All products",
            error: false,
            success: true,
            data: allProducts
        })


    }catch(err){
       res.status(500).json({
        message: err.message || err,
        error: true,
        success: false
       })
    }
}

module.exports = getProductController
 