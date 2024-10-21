const addToCartModal = require("../../models/cartProducts")


const updateAddToCartProduct = async(req,res)=>{
    try{
        const currentUser = req.userId
        const addToCartProductId = req.body?._id
        const qty = req.body?.quantity
    
        const updateProduct = await addToCartModal.updateOne(
            {
                _id: addToCartProductId
            },
            {
                ...(qty && {quantity: qty})
            }
        )
        res.status(200).json({
            message: "update cart",
            data: updateProduct,
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
module.exports = updateAddToCartProduct