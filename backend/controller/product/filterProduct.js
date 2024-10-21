const productModal = require("../../models/productModal")


const filterProductController = async(req,res)=>{
    try{
        const categoryList = req?.body?.category
        const product = await productModal.find({
            category : {
                "$in" : categoryList
            }
        })
        res.status(200).json({
            message: "product",
            data: product,
            error: false,
            success: true
        })

    }catch(err){
        res.status(500).json({
            message : err.message || err,
            error: true,
            success: false
        })
    }
}

module.exports = filterProductController