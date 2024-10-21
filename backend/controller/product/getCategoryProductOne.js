const productModal = require("../../models/productModal")

const getCategoryProduct = async(req,res)=>{
    
    try{
     const productCategory = await productModal.distinct("category")

     //array to store one product from each array
     const productByCategory = []
     for(const category of productCategory){
        const product = await productModal.findOne({category})
        if(product){
            productByCategory.push(product)
        }
     }
       
    res.status(200).json({
        message: "Catgory product",
        data: productByCategory,
        success: true,
        error:false
    })
    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = getCategoryProduct