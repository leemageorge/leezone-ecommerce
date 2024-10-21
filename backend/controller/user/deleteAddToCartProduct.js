const addToCartModal = require("../../models/cartProducts")

const deleteAddToCartProduct = async(req,res)=>{
    try{
        const currentUser = req.userId
        const addToCartProductId = req?.body?._id

        const deleteProduct = await addToCartModal.deleteOne({_id: addToCartProductId})

        res.status(200).json({
            message: "Product has been deleted from cart",
            data: deleteProduct,
            success: true,
            error: false
        })

    }catch(err){
        res.status(500).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}
module.exports = deleteAddToCartProduct