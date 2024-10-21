const addToCartModal = require("../../models/cartProducts")

const addToCartViewProduct = async(req,res) =>{
    try{

        const currentUser = req.userId

        const allProducts = await addToCartModal.find({
            userId : currentUser
        }).populate("productId")
        
        res.status(200).json({
            message: "ok",
            data: allProducts,
            error: false,
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

module.exports = addToCartViewProduct
