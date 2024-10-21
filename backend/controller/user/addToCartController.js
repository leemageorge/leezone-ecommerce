const addToCartModal = require("../../models/cartProducts")

const addToCartController = async(req,res)=>{
    try{
        const { productId } = req?.body
        const currentUser = req.userId

        const isProductAvailable = await addToCartModal.findOne({productId, userId: currentUser})

        if(isProductAvailable){
            return res.json({
                message: "Already exist in Add to Cart",
                error:true,
                success: false
            })
        }

        const payload = {
            productId : productId,
            quantity: 1,
            userId: currentUser
        }

        const newAddToCart = new addToCartModal(payload)
        const savedProduct = await newAddToCart.save()

        res.status(500).json({
            message: "Add to cart",
            data: savedProduct,
            error:false,
            success: true
        })

    }catch(err){
        res.staus(500).json({
            message: err?.message || err,
            error: true,
            success:false
        })
    }
}

module.exports = addToCartController